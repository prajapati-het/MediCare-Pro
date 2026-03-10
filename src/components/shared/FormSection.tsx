import { cn } from "@/lib/utils";

const ACCENT_COLORS: Record<string, string> = {
  blue:   "bg-blue-500/10 text-blue-500",
  rose:   "bg-rose-500/10 text-rose-500",
  teal:   "bg-teal-500/10 text-teal-500",
  green:  "bg-emerald-500/10 text-emerald-500",
  amber:  "bg-amber-500/10 text-amber-500",
  purple: "bg-purple-500/10 text-purple-500",
  slate:  "bg-slate-500/10 text-slate-500",
  indigo: "bg-indigo-500/10 text-indigo-500",
};

interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  accent?: string;
  children: React.ReactNode;
}

export function FormSection({ icon, title, accent = "blue", children }: FormSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={cn("p-1.5 rounded-md shrink-0", ACCENT_COLORS[accent] ?? ACCENT_COLORS.blue)}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-foreground tracking-wide uppercase">{title}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      {children}
    </div>
  );
}