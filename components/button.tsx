import { cn } from "@/lib/utils";
import React from "react";

export const Button: React.FC<{
  children?: React.ReactNode;
  className?: string;
  variant?: "simple" | "outline" | "primary" | "muted";
  as?: React.ElementType;
  [x: string]: any;
}> = ({
  children,
  className,
  variant = "primary",
  as: Tag = "button",
  ...props
}) => {
  const variantClass =
    variant === "simple"
      ? "bg-[#facc15]relative z-10 bg-transparent hover:border-[#facc15] hover:bg-secondary/50  text-white text-sm md:text-sm transition font-bold duration-200  rounded-[10px] px-8 py-2  flex items-center justify-center"
      : variant === "outline"
      ? "bg-white relative z-10 bg-[#facc15]/90 hover:shadow-xl  text-black border border-black hover:text-black text-sm md:text-sm transition font-bold duration-200  rounded-[10px] px-8 py-2  flex items-center justify-center"
      : variant === "primary"
      ? "bg-[#facc15]relative z-10 bg-[#facc15]/90  border border-[#facc15] text-black text-sm md:text-sm transition font-bold duration-200  rounded-[10px] px-8 py-2  flex items-center justify-center"
      : variant === "muted"
      ? "bg-neutral-800 relative z-10 hover:bg-neutral-900  text-white text-sm md:text-sm transition font-bold duration-200  rounded-[10px] px-8 py-2  flex items-center justify-center "
      : "";
  return (
    <Tag
      className={cn(
        "bg-[#facc15]relative z-10 bg-[#facc15]/90 group hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm md:text-sm transition font-bold duration-200  rounded-[10px] px-8 py-2  flex items-center justify-center",
        variantClass,
        className
      )}
      {...props}
    >
      {children ?? `Get Started`}
    </Tag>
  );
};
