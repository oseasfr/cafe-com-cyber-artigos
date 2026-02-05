import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ delay });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
