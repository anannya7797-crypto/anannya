import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { useProjectsResource, useSkillsResource } from "@/services/content";

const cats = ["Frontend", "Backend", "AI/ML", "DevOps"] as const;

export default function Skills() {
  const { data: skillsResource } = useSkillsResource();
  const { data: projectsResource } = useProjectsResource();
  const [active, setActive] = useState<(typeof cats)[number]>("Frontend");
  const skills = skillsResource?.data ?? [];
  const projects = projectsResource?.data ?? [];

  const radarData = useMemo(
    () =>
      cats.map((c) => {
        const list = skills.filter((s) => s.category === c);
        const avg = list.reduce((n, s) => n + s.level, 0) / Math.max(1, list.length);
        return { category: c, level: Math.round(avg) };
      }),
    [skills]
  );

  const filtered = skills.filter((s) => s.category === active);
  const relatedProjects = projects.filter((p) =>
    p.tech.some((t) => filtered.some((s) => s.name.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.name.toLowerCase())))
  );

  return (
    <>
      <SEO title="Skills · Anannya" description="A live dashboard of frontend, backend, AI/ML, and DevOps skills." />
      <section className="container-custom">
        <header className="mb-12 max-w-3xl">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">// Toolbelt</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Skills Dashboard</h1>
          <p className="mt-4 text-muted-foreground text-lg">A live, opinionated view of where I spend my hours.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur"
          >
            <div className="text-xs font-mono text-muted-foreground mb-4">Category strengths</div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "JetBrains Mono" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Radar name="Level" dataKey="level" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono text-muted-foreground">Proficiency · {active}</div>
              <div className="flex flex-wrap gap-1">
                {cats.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-full transition ${
                      active === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filtered} layout="vertical" margin={{ left: 12 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontFamily: "JetBrains Mono", fontSize: 12 }}
                  cursor={{ fill: "hsl(var(--secondary))" }}
                />
                <Bar dataKey="level" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">Related projects · {active}</div>
          {relatedProjects.length === 0 ? (
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 text-sm text-muted-foreground font-mono">
              No projects tagged with these skills yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedProjects.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
                  <div className="text-xs font-mono text-accent mb-1.5">{p.category}</div>
                  <div className="font-display font-semibold">{p.title}</div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.tech.slice(0, 3).map((t) => (
                      <Badge key={t} variant="secondary" className="font-mono text-[10px] rounded-full">{t}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
