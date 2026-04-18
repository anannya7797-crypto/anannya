import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { useBlogsResource } from "@/services/content";

export default function SystemDesign() {
  const { slug } = useParams();
  const { data: blogsResource, isLoading } = useBlogsResource();
  const blogs = blogsResource?.data ?? [];
  const post = useMemo(() => blogs.find((b) => b.slug === slug), [blogs, slug]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (slug && post) {
    return (
      <>
        <SEO title={`${post.title} · Anannya`} description={post.excerpt} />
        <div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-primary z-[60] origin-left" style={{ transform: `scaleX(${progress / 100})` }} />
        <article className="container-custom max-w-3xl">
          <Link to="/system-design" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-xs rounded-full">{t}</Badge>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readingTime}</span>
          </div>
          <div className="prose prose-invert max-w-none mt-10 prose-headings:font-display prose-headings:tracking-tight prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-foreground/80">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const inline = !match;
                  return !inline ? (
                    <SyntaxHighlighter style={oneDark as any} language={match[1]} PreTag="div" customStyle={{ borderRadius: "0.875rem", fontSize: "0.875rem" }}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-sm" {...props}>{children}</code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </>
    );
  }

  return (
    <>
      <SEO title="System Design · Anannya" description="Notes on scalability, databases, caching, and distributed systems." />
      <section className="container-custom">
        <header className="mb-12 max-w-3xl">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">// Writing</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">System Design Notes</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Pragmatic patterns and post-mortems on scaling, caching, databases, and the boring decisions that age well.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl border border-border/60 bg-card/40 animate-pulse" />
            ))}
          {blogs.map((b) => (
            <Link
              key={b.slug}
              to={`/system-design/${b.slug}`}
              className="group p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur hover:border-primary/40 hover:bg-card/70 transition-all"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {b.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono text-[10px] rounded-full">{t}</Badge>
                ))}
              </div>
              <h2 className="font-display text-xl font-semibold group-hover:text-gradient transition">{b.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground font-mono">
                <span>{b.date}</span>
                <span>{b.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
