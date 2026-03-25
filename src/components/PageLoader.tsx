import { cn } from "@/lib/utils";

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading your dashboard..." }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">

        {/* Spinner with pulse rings */}
        <div className="relative w-[72px] h-[72px]">
          {/* Outer pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[pulse-ring_2s_ease-in-out_infinite]" />
          {/* Inner pulse ring */}
          <span className="absolute inset-2 rounded-full border-2 border-primary/20 animate-[pulse-ring_2s_ease-in-out_infinite_0.4s]" />
          {/* Spinning arc */}
          <span className="absolute inset-[14px] rounded-full border-[2.5px] border-muted border-t-primary animate-spin" />
          {/* Cross-hair center */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="absolute w-5 h-[2px] rounded-full bg-primary/20" />
            <span className="absolute w-[2px] h-5 rounded-full bg-primary/20" />
          </span>
        </div>

        {/* Animated bars */}
        <div className="flex items-end gap-1 h-5">
          {[
            { h: "h-5",    delay: "delay-0"    },
            { h: "h-3.5",  delay: "delay-150"  },
            { h: "h-5",    delay: "delay-300"  },
            { h: "h-2.5",  delay: "delay-[450ms]" },
            { h: "h-4",    delay: "delay-[600ms]" },
          ].map(({ h, delay }, i) => (
            <span
              key={i}
              className={cn(
                "w-1 rounded-full bg-primary origin-bottom",
                h, delay,
                "animate-[bar_1.1s_ease-in-out_infinite]"
              )}
            />
          ))}
        </div>

        {/* Text */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
          <p className="text-base font-medium text-foreground mb-1">MediCare Pro</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>

      </div>
    </div>
  );
}