import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-volt-500 text-ink-900 hover:bg-volt-400 active:bg-volt-600 shadow-[0_8px_24px_-12px_rgba(168,214,28,0.9)]",
  dark: "bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950",
  outline:
    "border border-ink-200 bg-white text-ink-900 hover:border-ink-900 hover:bg-ink-50",
  ghost: "text-ink-900 hover:bg-ink-100",
  light:
    "border border-white/25 bg-white/5 text-white backdrop-blur hover:border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.8125rem]",
  lg: "h-13 px-7 text-[0.875rem]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"a">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <a
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-display font-bold uppercase tracking-[0.12em] transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:translate-y-px ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}

type ButtonElProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  ...rest
}: ButtonElProps) {
  return (
    <button
      {...rest}
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-display font-bold uppercase tracking-[0.12em] transition-[background-color,border-color,color,transform,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
