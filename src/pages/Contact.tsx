import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { api, endpoints, withFallback } from "@/services/api";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type FormState = z.infer<typeof schema>;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: any = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const { isMock } = await withFallback(
      async () => (await api.post(endpoints.contact, parsed.data)).data,
      { ok: true }
    );
    setStatus("sent");
    toast.success(isMock ? "Message captured locally (Django API offline)" : "Message sent — I'll reply soon!");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <>
      <SEO title="Contact · Anannya Srivastava" description="Get in touch — available for opportunities and collaborations." />
      <section className="container-custom max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">// Say hi</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Let's build something.</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Whether it's a collaboration, an opportunity, or just a kind word — my inbox is open.
            </p>

            <div className="mt-8 space-y-3">
              <a href="mailto:hello@example.com" className="flex items-center gap-3 p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur hover:border-primary/40 transition">
                <Mail className="h-4 w-4 text-accent" />
                <span className="font-mono text-sm">hello@example.com</span>
              </a>
              <a href="https://github.com/rectifier_4321" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur hover:border-primary/40 transition">
                <Github className="h-4 w-4 text-accent" />
                <span className="font-mono text-sm">github.com/rectifier_4321</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur hover:border-primary/40 transition">
                <Linkedin className="h-4 w-4 text-accent" />
                <span className="font-mono text-sm">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={submit}
            className="p-6 md:p-8 rounded-2xl border-gradient relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-aurora opacity-20" />
            <div className="relative space-y-4">
              <div>
                <Label htmlFor="name" className="font-mono text-xs">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 rounded-xl bg-background/60"
                  placeholder="Ada Lovelace"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="font-mono text-xs">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5 rounded-xl bg-background/60"
                  placeholder="ada@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="font-mono text-xs">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 1000) })}
                  className="mt-1.5 rounded-xl bg-background/60 resize-none"
                  placeholder="Tell me about your project, idea, or opportunity…"
                />
                <div className="mt-1 flex justify-between text-xs">
                  {errors.message ? (
                    <span className="text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</span>
                  ) : <span className="text-muted-foreground font-mono">min 10 chars</span>}
                  <span className="text-muted-foreground font-mono">{form.message.length}/1000</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> :
                 status === "sent" ? <><CheckCircle2 className="mr-2 h-4 w-4" />Sent</> :
                 <><Send className="mr-2 h-4 w-4" />Send message</>}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </>
  );
}
