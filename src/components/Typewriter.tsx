import { useEffect, useState } from "react";

export function Typewriter({ phrases, speed = 60, pause = 1600 }: { phrases: string[]; speed?: number; pause?: number }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[i % phrases.length];
    let t: number;
    if (!deleting && text === current) {
      t = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
      return;
    } else {
      t = window.setTimeout(
        () => setText(current.slice(0, deleting ? text.length - 1 : text.length + 1)),
        deleting ? speed / 2 : speed
      );
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, i, phrases, speed, pause]);

  return (
    <span className="font-mono">
      {text}
      <span className="inline-block w-[2px] h-[0.9em] -mb-0.5 bg-primary ml-0.5 animate-blink" />
    </span>
  );
}
