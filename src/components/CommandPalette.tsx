import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Home, FolderGit2, BookOpen, Sparkles, BarChart3, Clock, Mail, Github, Linkedin } from "lucide-react";

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}><Home className="mr-2 h-4 w-4" />Home</CommandItem>
          <CommandItem onSelect={() => go("/projects")}><FolderGit2 className="mr-2 h-4 w-4" />Projects</CommandItem>
          <CommandItem onSelect={() => go("/system-design")}><BookOpen className="mr-2 h-4 w-4" />System Design</CommandItem>
          <CommandItem onSelect={() => go("/ai")}><Sparkles className="mr-2 h-4 w-4" />AI Lab</CommandItem>
          <CommandItem onSelect={() => go("/skills")}><BarChart3 className="mr-2 h-4 w-4" />Skills</CommandItem>
          <CommandItem onSelect={() => go("/timeline")}><Clock className="mr-2 h-4 w-4" />Timeline</CommandItem>
          <CommandItem onSelect={() => go("/contact")}><Mail className="mr-2 h-4 w-4" />Contact</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="External">
          <CommandItem onSelect={() => window.open("https://github.com/rectifier_4321", "_blank")}>
            <Github className="mr-2 h-4 w-4" />GitHub Profile
          </CommandItem>
          <CommandItem onSelect={() => window.open("https://linkedin.com", "_blank")}>
            <Linkedin className="mr-2 h-4 w-4" />LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
