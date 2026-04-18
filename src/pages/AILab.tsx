import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Cpu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { api, endpoints, withFallback } from "@/services/api";

type Result = { label: string; confidence: number; processingMs: number; model: string; usedMock: boolean };

const POSITIVE = ["amazing", "love", "great", "awesome", "fantastic", "good", "wonderful", "incredible", "best", "happy"];
const NEGATIVE = ["bad", "hate", "terrible", "awful", "worst", "sad", "angry", "broken", "boring", "ugly"];

function mockInfer(text: string): Result {
  const t = text.toLowerCase();
  const pos = POSITIVE.reduce((n, w) => n + (t.includes(w) ? 1 : 0), 0);
  const neg = NEGATIVE.reduce((n, w) => n + (t.includes(w) ? 1 : 0), 0);
  const score = pos - neg;
  const label = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
  const confidence = Math.min(0.99, 0.55 + Math.abs(score) * 0.12 + Math.random() * 0.08);
  return { label, confidence, processingMs: 80 + Math.floor(Math.random() * 120), model: "distilbert-base-uncased-finetuned-sst-2", usedMock: true };
}

export default function AILab() {
  const [text, setText] = useState("This portfolio looks absolutely amazing — I love the aurora hero!");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    const start = performance.now();
    const { data, isMock } = await withFallback(
      async () => (await api.post(endpoints.aiInfer, { text })).data as Omit<Result, "usedMock">,
      mockInfer(text)
    );
    const elapsed = Math.round(performance.now() - start);
    setResult({ ...data, processingMs: data.processingMs ?? elapsed, usedMock: isMock });
    setLoading(false);
  };

  return (
    <>
      <SEO title="AI Lab · Anannya" description="Live AI inference demos backed by a Django + ML pipeline." />
      <section className="container-custom max-w-4xl">
        <header className="mb-10">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">// AI Experiments</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">AI Lab</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Try a live model. The frontend hits <code className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">{endpoints.aiInfer}</code> on your Django backend; if it's offline, an in-browser fallback runs so the demo always works.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur"
          >
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
              <Sparkles className="h-4 w-4 text-accent" /> Sentiment classifier
            </div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 500))}
              rows={6}
              placeholder="Type something to analyze…"
              className="resize-none rounded-xl bg-background/60"
            />
            <div className="mt-2 text-xs font-mono text-muted-foreground text-right">{text.length} / 500</div>
            <Button
              onClick={run}
              disabled={loading || !text.trim()}
              className="w-full mt-3 rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Zap className="mr-2 h-4 w-4" />Run inference</>}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl border-gradient relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-aurora opacity-20" />
            <div className="relative">
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
                <Cpu className="h-4 w-4 text-accent" /> Result
              </div>

              {!result && !loading && (
                <div className="h-48 grid place-items-center text-sm text-muted-foreground font-mono">
                  Run the model to see output.
                </div>
              )}

              {loading && (
                <div className="h-48 grid place-items-center">
                  <div className="space-y-2 w-full">
                    <div className="h-3 rounded-full bg-secondary animate-pulse" />
                    <div className="h-3 rounded-full bg-secondary animate-pulse w-3/4" />
                    <div className="h-3 rounded-full bg-secondary animate-pulse w-1/2" />
                  </div>
                </div>
              )}

              {result && !loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-1">Prediction</div>
                    <div className="font-display text-3xl font-bold text-gradient">{result.label}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-muted-foreground">Confidence</span>
                      <span>{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="h-full bg-gradient-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/60">
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">Latency</div>
                      <div className="font-mono text-sm">{result.processingMs} ms</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">Mode</div>
                      <Badge variant={result.usedMock ? "secondary" : "default"} className="font-mono text-[10px] rounded-full">
                        {result.usedMock ? "local fallback" : "live API"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground break-all">model: {result.model}</div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
