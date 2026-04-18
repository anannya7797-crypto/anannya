import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/50 bg-card/30">
      <div className="container-custom flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
        <div>
          <div className="section-chip mb-3">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Green Signal
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            &copy; {new Date().getFullYear()} Anannya Srivastava. Still learning. Always building.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/rectifier_4321" target="_blank" rel="noreferrer" className="rounded-full p-2 transition hover:bg-secondary" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full p-2 transition hover:bg-secondary" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
          <Link to="/contact" className="rounded-full p-2 transition hover:bg-secondary" aria-label="Contact">
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
