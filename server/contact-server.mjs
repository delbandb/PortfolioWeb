import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { mkdir, appendFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || process.env.CONTACT_PORT || 8787);
const HOST = process.env.CONTACT_HOST || (process.env.RENDER ? "0.0.0.0" : "127.0.0.1");
const FORWARD_URL = process.env.CONTACT_FORWARD_URL || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "delbandbehdadfar@yahoo.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
const serverDir = fileURLToPath(new URL(".", import.meta.url));
const publicDir = normalize(join(serverDir, "..", "dist"));
const messagesDir = join(process.cwd(), "messages");
const messagesFile = join(messagesDir, "contact-messages.jsonl");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": process.env.CONTACT_ALLOWED_ORIGIN || "http://127.0.0.1:5173",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function sendNotFound(response) {
  response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify({ ok: false, error: "Not found." }));
}

async function serveStatic(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendNotFound(response);
    return;
  }

  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const decodedPath = decodeURIComponent(url.pathname);
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const hasExtension = Boolean(extname(safePath));
  const requestedFile = safePath === "/" || !hasExtension ? "index.html" : safePath.replace(/^[/\\]/, "");
  const filePath = normalize(join(publicDir, requestedFile));

  if (!filePath.startsWith(publicDir)) {
    sendNotFound(response);
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file.");

    response.writeHead(200, {
      "Content-Length": fileStat.size,
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    if (requestedFile !== "index.html") {
      sendNotFound(response);
      return;
    }

    response.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Portfolio build not found. Run `npm run build` before starting the server.");
  }
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessageText(message) {
  return [
    `New portfolio message`,
    ``,
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Subject: ${message.subject}`,
    `Received: ${message.receivedAt}`,
    ``,
    message.message,
  ].join("\n");
}

function formatMessageHtml(message) {
  return `
    <h2>New portfolio message</h2>
    <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(message.subject)}</p>
    <p><strong>Received:</strong> ${escapeHtml(message.receivedAt)}</p>
    <hr />
    <p>${escapeHtml(message.message).replace(/\n/g, "<br />")}</p>
  `;
}

async function sendEmailNotification(message) {
  if (!RESEND_API_KEY) return null;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: message.email,
      subject: `[Portfolio] ${message.subject}`,
      text: formatMessageText(message),
      html: formatMessageHtml(message),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email provider returned ${response.status}: ${errorBody}`);
  }

  return "email";
}

async function forwardWebhookNotification(message) {
  if (!FORWARD_URL) return;

  const response = await fetch(FORWARD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(`Forward URL returned ${response.status}.`);
  }

  return "webhook";
}

async function deliverNotifications(message) {
  const deliveredVia = [];
  const emailResult = await sendEmailNotification(message);
  const webhookResult = await forwardWebhookNotification(message);

  if (emailResult) deliveredVia.push(emailResult);
  if (webhookResult) deliveredVia.push(webhookResult);
  if (deliveredVia.length === 0) deliveredVia.push("local-file");

  return deliveredVia;
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  const pathname = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`).pathname;

  if (request.method === "GET" && pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      notifications: {
        email: Boolean(RESEND_API_KEY),
        webhook: Boolean(FORWARD_URL),
        localFile: true,
      },
    });
    return;
  }

  if (pathname !== "/api/contact") {
    await serveStatic(request, response);
    return;
  }

  if (request.method !== "POST") {
    sendNotFound(response);
    return;
  }

  try {
    const payload = JSON.parse(await readRequestBody(request));
    const message = {
      receivedAt: new Date().toISOString(),
      name: cleanText(payload.name, 120),
      email: cleanText(payload.email, 180),
      subject: cleanText(payload.subject, 180) || "Nuevo mensaje desde tu portfolio",
      message: cleanText(payload.message, 5_000),
      source: cleanText(payload.source, 80) || "standalone-portfolio",
    };

    if (!message.name || !message.email || !message.message) {
      sendJson(response, 400, { ok: false, error: "Name, email, and message are required." });
      return;
    }

    if (!isValidEmail(message.email)) {
      sendJson(response, 400, { ok: false, error: "A valid email is required." });
      return;
    }

    await mkdir(messagesDir, { recursive: true });
    await appendFile(messagesFile, `${JSON.stringify(message)}\n`, "utf8");
    const deliveredVia = await deliverNotifications(message);

    sendJson(response, 200, { ok: true, deliveredVia });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to save contact message.",
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Contact receiver listening at http://${HOST}:${PORT}/api/contact`);
  console.log(`Portfolio static files served from ${publicDir}`);
  console.log(`Messages will be stored in ${messagesFile}`);
  console.log(`Email notifications: ${RESEND_API_KEY ? `enabled to ${CONTACT_TO_EMAIL}` : "disabled"}`);
  console.log(`Webhook forwarding: ${FORWARD_URL ? "enabled" : "disabled"}`);
});
