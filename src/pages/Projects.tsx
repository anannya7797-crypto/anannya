import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Grid3x3, List, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SEO } from "@/components/SEO";
import { type Project } from "@/data/mock";
import { useProjectsResource } from "@/services/content";

const categories = ["All", "AI/ML", "Full-Stack", "Systems", "Frontend"] as const;

export default function Projects() {
  const { data: projectsResource, isLoading } = useProjectsResource();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [tech, setTech] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const projects = projectsResource?.data ?? [];

  const allTech = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(), []);
  const filtered = projects.filter((p) => (cat === "All" || p.category === cat) && (!tech || p.tech.includes(tech)));
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <SEO title="Projects · Anannya Srivastava" description="Selected work across AI/ML, full-stack, and systems engineering." />
      <section className="container-custom">
        <header className="mb-12 max-w-3xl">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">{`// ${projects.length.toString().padStart(2, "0")} Projects`}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Things I've built</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            A curated selection of full-stack, AI, and systems projects — each one an experiment in clarity, speed, and impact.
          </p>
        </header>

        {/* Featured */}
        <div className="mb-16">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">Featured</div>
          <div className="grid md:grid-cols-3 gap-4">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-40 rounded-2xl border border-border/60 bg-card/40 animate-pulse" />
              ))}
            {featured.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setOpen(p)}
                className="group text-left relative p-6 rounded-2xl border-gradient overflow-hidden hover:shadow-glow transition-all"
              >
                <div className="absolute inset-0 bg-gradient-aurora opacity-30 group-hover:opacity-60 transition" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                    <span className="text-xs font-mono text-muted-foreground">{p.category}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <Button
                key={c}
                variant={cat === c ? "default" : "outline"}
                size="sm"
                onClick={() => setCat(c)}
                className="rounded-full text-xs"
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-card/40">
            <Button size="icon" variant={view === "grid" ? "secondary" : "ghost"} onClick={() => setView("grid")} className="h-7 w-7 rounded-full" aria-label="Grid view">
              <Grid3x3 className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant={view === "list" ? "secondary" : "ghost"} onClick={() => setView("list")} className="h-7 w-7 rounded-full" aria-label="List view">
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-10">
          {allTech.map((t) => (
            <button
              key={t}
              onClick={() => setTech(tech === t ? null : t)}
              className={`text-xs font-mono px-2.5 py-1 rounded-full border transition ${
                tech === t ? "bg-primary text-primary-foreground border-primary" : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view + cat + tech}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}
          >
            {filtered.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => setOpen(p)}
                whileHover={{ y: -2 }}
                className={`group text-left p-5 rounded-2xl border border-border/60 bg-card/40 backdrop-blur hover:border-primary/40 hover:bg-card/70 transition-all ${
                  view === "list" ? "flex items-center gap-6" : ""
                }`}
              >
                <div className={view === "list" ? "flex-1" : ""}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-accent">{p.category}</span>
                    {p.featured && <Star className="h-3 w-3 text-accent fill-accent" />}
                  </div>
                  <h3 className="font-display text-lg font-semibold group-hover:text-gradient transition">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.tech.slice(0, 4).map((t) => (
                      <Badge key={t} variant="secondary" className="font-mono text-[10px] rounded-full">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-mono text-sm">No projects match those filters.</div>
        )}
      </section>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <div className="text-xs font-mono text-accent mb-2">{open.category}</div>
                <DialogTitle className="font-display text-2xl">{open.title}</DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground">{open.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {open.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono text-xs rounded-full">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                {open.github && (
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={open.github} target="_blank" rel="noreferrer"><Github className="mr-2 h-4 w-4" />Code</a>
                  </Button>
                )}
                {open.demo && (
                  <Button asChild className="rounded-full bg-gradient-primary text-primary-foreground">
                    <a href={open.demo} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" />Live demo</a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
