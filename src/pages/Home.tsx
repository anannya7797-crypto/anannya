import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Sparkles, Mail, Star, Cpu, ScanLine, GraduationCap, Briefcase, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "@/components/Typewriter";
import { SEO } from "@/components/SEO";
import { useGitHub } from "@/hooks/useGitHub";
import { useProjectsResource, useSkillsResource, useTimelineResource } from "@/services/content";
import avatar from "@/assets/Anannya1.jpg";

export default function Home() {
  const gh = useGitHub();
  const { data: projectsResource } = useProjectsResource();
  const { data: skillsResource } = useSkillsResource();
  const { data: timelineResource } = useTimelineResource();
  const iconFor = {
    education: GraduationCap,
    experience: Briefcase,
    project: Rocket,
  };
  const timelineCardStyles = [
    "bg-[#edf4ff]/95 border-[#c9d8f2]",
    "bg-[#e8f1ff]/95 border-[#bfd0ef]",
    "bg-[#f2f7ff]/95 border-[#d3dff4]",
    "bg-[#eef5ff]/95 border-[#c6d7f1]",
  ];

  const projects = projectsResource?.data ?? [];
  const skills = skillsResource?.data ?? [];
  const timeline = timelineResource?.data ?? [];

  const timelinePreview = [...timeline]
    .sort((a, b) => {
      const aYear = Number(a.period.match(/\d{4}/)?.[0] ?? 0);
      const bYear = Number(b.period.match(/\d{4}/)?.[0] ?? 0);
      return aYear - bYear;
    });

  const stats = [
    { label: "Projects", value: projects.length, suffix: "+" },
    { label: "Skills", value: skills.length, suffix: "" },
    { label: "GitHub Repos", value: gh.loading ? "-" : gh.publicRepos, suffix: "" },
    { label: "Followers", value: gh.loading ? "-" : gh.followers, suffix: "" },
  ];

  return (
    <>
      <SEO
        title="Anannya Srivastava - Full-Stack and AI Engineer"
        description="MCA student building AI-powered full-stack products. Projects, system design, and AI experiments."
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora animate-aurora" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 circuit-grid opacity-30" />

        <div className="container-custom relative pb-24 pt-12 md:pb-32 md:pt-20">
          <div className="grid items-center gap-12 md:items-start md:grid-cols-[1.25fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-chip mb-6">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Open for opportunities
              </div>

              <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
                Building clean,
                <br />
                <span className="text-gradient">human-centered tech.</span>
              </h1>

              <div className="mt-6 min-h-[3.5rem] max-w-xl text-lg text-muted-foreground md:text-xl">
                <Typewriter
                  phrases={[
                    "Blue palette. Sharp systems. Real products.",
                    "Where AI meets thoughtful frontend craft.",
                    "Full-stack engineer and MCA student.",
                    "Still learning. Always building.",
                  ]}
                />
              </div>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                I'm Anannya Srivastava, an MCA student turning ambitious ideas into intelligent,
                scalable products across AI, data, and user-focused interface design.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                  <Link to="/projects">
                    View Projects <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-border/80 bg-card/60">
                  <Link to="/contact">
                    <Mail className="mr-1.5 h-4 w-4" /> Get in touch
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="rounded-full">
                  <a href="https://github.com/rectifier_4321" target="_blank" rel="noreferrer">
                    <Github className="mr-1.5 h-4 w-4" /> GitHub
                  </a>
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Cpu, label: "AI Workflows", value: "Model-backed interfaces" },
                  { icon: ScanLine, label: "Design Language", value: "Glass + grid + motion" },
                  { icon: Sparkles, label: "Build Style", value: "Fast, readable, scalable" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="tech-panel p-4">
                    <div className="relative flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </div>
                    <p className="relative mt-3 text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative mx-auto w-full max-w-md md:-mt-2"
            >
              <div className="tech-panel noise min-h-[35rem] p-5 md:min-h-[43rem] md:p-6">
                <div className="absolute inset-0 bg-aurora opacity-30" />
                <div className="absolute right-5 top-5 rounded-full border border-border/80 bg-card/75 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-accent">
                  System Online
                </div>

                <div className="relative flex flex-col items-center">
                  <div className="relative h-[22rem] w-64 md:h-[30rem] md:w-72">
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-primary opacity-20 blur-3xl" />
                    <div className="absolute inset-0 rounded-[2rem] border border-border/70" />
                    <div className="absolute inset-[0.85rem] rounded-[1.7rem] border border-border/50" />
                    <div className="absolute inset-[1.15rem] overflow-hidden rounded-[1.5rem] border-gradient">
                      <img
                        src={avatar}
                        alt="Anannya Srivastava"
                        width={512}
                        height={512}
                        className="h-full w-full object-cover object-[center_12%]"
                      />
                    </div>
                  </div>

                  <div className="relative mt-6 flex w-full items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur">
                    <div>
                      <div className="text-sm font-semibold">Anannya Srivastava</div>
                      <div className="text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
                        Full-stack x AI
                      </div>
                    </div>
                    <Badge variant="outline" className="rounded-full border-border/80 bg-secondary/60 font-mono text-[10px] uppercase tracking-[0.2em]">
                      Ready to build
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 overflow-hidden rounded-[2rem] border border-border/70 bg-card/55 shadow-card"
          >
            <div className="grid grid-cols-2 gap-px bg-border/50 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card/70 p-6 backdrop-blur md:p-8">
                  <div className="font-display text-3xl font-bold text-gradient md:text-4xl">
                    {s.value}
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground md:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-custom py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="section-chip mb-3">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Timeline
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Journey Timeline</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              A simple timeline on the homepage, with full details available on the separate page.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full border-border/80 bg-card/60">
            <Link to="/timeline">View full details</Link>
          </Button>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-5">
            {timelinePreview.map((item, index) => {
              const Icon = iconFor[item.type];
              const isRight = index % 2 === 1;
              const cardStyle = timelineCardStyles[index % timelineCardStyles.length];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className={`relative md:flex ${isRight ? "md:justify-end" : "md:justify-start"}`}
                >
                  <div className={`absolute -left-1 top-5 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border border-border bg-card md:left-1/2 ${
                    isRight ? "" : ""
                  }`}>
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>

                  <div className={`tech-panel ml-6 max-w-[calc(100%-1.5rem)] p-5 md:ml-0 md:w-[calc(50%-2rem)] md:max-w-md md:p-6 ${cardStyle}`}>
                    <div className="text-xs font-mono uppercase tracking-[0.24em] text-accent">
                      {item.period}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-mono text-muted-foreground">
                      {item.org}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-custom py-20 pt-0">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="section-chip mb-3">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Live from GitHub
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Recent repositories</h2>
          </div>
          <a href="https://github.com/rectifier_4321" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground transition hover:text-foreground">
            View all -
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gh.loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 rounded-[1.75rem] border border-border/60 bg-card/50 animate-pulse" />
            ))}

          {!gh.loading && gh.error && (
            <div className="col-span-full text-sm font-mono text-muted-foreground">
              Couldn't reach GitHub right now. Showing portfolio data instead.
            </div>
          )}

          {!gh.loading && !gh.error && gh.topRepos.length === 0 && (
            <div className="col-span-full text-sm font-mono text-muted-foreground">
              No public repos yet. Check back soon.
            </div>
          )}

          {gh.topRepos.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="tech-panel group p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="relative flex items-start justify-between mb-3">
                <div className="font-mono text-sm font-medium transition-colors group-hover:text-primary">{r.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3" /> {r.stars}
                </div>
              </div>
              <p className="relative min-h-[2.5rem] text-sm text-muted-foreground line-clamp-2">
                {r.description || "-"}
              </p>
              {r.language && (
                <div className="relative mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" /> {r.language}
                </div>
              )}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
