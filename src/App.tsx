import { Route, Router, Switch } from "wouter";
import About from "@/pages/About";
import Certificates from "@/pages/Certificates";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Languages from "@/pages/Languages";
import Projects from "@/pages/Projects";
import Resume from "@/pages/Resume";
import Skills from "@/pages/Skills";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-6xl font-black text-white mb-4"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            textShadow: "0 0 30px rgba(168,85,247,0.6)",
          }}
        >
          404
        </h1>
        <p
          className="text-white/40 text-sm tracking-widest"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          SIGNAL_NOT_FOUND
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/resume" component={Resume} />
        <Route path="/skills" component={Skills} />
        <Route path="/certificates" component={Certificates} />
        <Route path="/languages" component={Languages} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
