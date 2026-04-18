import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, ChevronDown } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useTimelineResource } from "@/services/content";

const iconFor = {
  education: GraduationCap,
  experience: Briefcase,
  project: Rocket,
};

export default function Timeline() {
  const { data: timelineResource, isLoading, isError } = useTimelineResource();
  const timeline = timelineResource?.data ?? [];
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!open && timeline[0]?.id) {
      setOpen(timeline[0].id);
    }
  }, [open, timeline]);

  return (
    <>
      <SEO title="Timeline · Anannya" description="Journey through education, projects, and experience." />
      <section className="container-custom max-w-3xl">
        <header className="mb-12">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">// Journey</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Timeline</h1>
          <p className="mt-4 text-muted-foreground text-lg">Education, experience, and milestones — in order.</p>
          {!isLoading && !isError && timeline.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-mono uppercase tracking-[0.22em] text-accent backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Live API
            </div>
          )}
        </header>

        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />
          {isError && (
            <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-muted-foreground">
              Timeline data could not be loaded from the backend. Please make sure Django is running.
            </div>
          )}
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="mb-4 h-28 rounded-2xl border border-border/60 bg-card/40 animate-pulse" />
            ))}
          {timeline.map((item, i) => {
            const Icon = iconFor[item.type];
            const isOpen = open === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                className="relative mb-4"
              >
                <div className="absolute -left-8 top-4 h-6 w-6 rounded-full bg-card border border-border grid place-items-center">
                  <Icon className="h-3 w-3 text-primary" />
                </div>
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="w-full text-left p-5 rounded-2xl border border-border/60 bg-card/40 backdrop-blur hover:border-primary/40 hover:bg-card/70 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono text-accent uppercase tracking-wider">{item.type}</div>
                      <div className="font-display text-lg font-semibold mt-1">{item.title}</div>
                      <div className="text-sm text-muted-foreground font-mono mt-0.5">{item.org} · {item.period}</div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-border/60">
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.details && (
                        <ul className="mt-3 space-y-1.5 text-sm">
                          {item.details.map((d) => (
                            <li key={d} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                              <span className="text-muted-foreground">{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
