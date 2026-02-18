import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeInUp({
  children,
  className,
  delay = 0,
}: FadeInUpProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}
