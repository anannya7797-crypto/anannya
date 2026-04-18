import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Moon, Sun, Command, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/system-design", label: "System Design" },
  { to: "/ai", label: "AI Lab" },
  { to: "/skills", label: "Skills" },
  { to: "/timeline", label: "Timeline" },
  { to: "/contact", label: "Contact" },
];

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-custom">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 md:px-5 ${
            scrolled ? "glass-strong shadow-elegant" : "glass"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-base">
            <div className="relative grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary text-xs font-black text-primary-foreground shadow-glow">
              A
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-primary blur-md opacity-50" />
            </div>
            <div className="hidden sm:block">
              <span className="block leading-none">Anannya</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Tech Portfolio
              </span>
            </div>
          </Link>

          <ul className="hidden items-center gap-1 text-sm lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-1.5 transition-colors ${
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenPalette}
              className="hidden gap-2 rounded-full text-muted-foreground md:inline-flex"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="text-xs font-mono">Ctrl K</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 rounded-2xl p-3 lg:hidden glass-strong"
            >
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                          isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
