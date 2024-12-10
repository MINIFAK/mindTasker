"use client";

import Link from "next/link";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariant = tv({
  base: "flex items-center rounded-3xl gap-2 p-3 justify-center transition-colors duration-300 ease-in-out",
  variants: {
    variant: {
      default:
        "bg-primary-500 text-neutral-900 font-inter font-medium  hover:bg-primary-400 active:bg-primary-600 disabled:bg-primary-300 disabled:text-neutral-400 disabled:cursor-not-allowed",
      outline:
        "outline outline-2 outline-primary-500 text-primary-500 font-inter font-medium hover:bg-primary-400 hover:text-white hover:outline-none active:bg-primary-600 active:outline-none disabled:outline-nonoe disabled:outline-primary-300 disabled:text-primary-300 disabled:cursor-not-allowed",
      floating:
        "bg-primary-500 hover:bg-primary-400 active:bg-primary-600 disabled:bg-primary-300 disabled:cursor-not-allowed",
      text: "text-neutral-900 font-inter font-medium  hover:bg-primary-400 active:bg-primary-600 disabled:bg-primary-300 disabled:text-neutral-400 disabled:cursor-not-allowed",
    },
    size: {
      none: "",
      normal: "min-h-8 min-w-28",
      full: "w-full",
      floating: "min-w-10 min-h-10 rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "normal",
  },
});
type ButtonProps = VariantProps<typeof buttonVariant> & {
  children: React.ReactNode;
  className?: string;
  link?: string;
  type: "a" | "link" | "button" | "buttonSubmit";
} & (
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
  );

export function Button({
  className = "",
  link,
  type,
  children,
  variant,
  size,
  ...rest
}: ButtonProps) {
  const classname = buttonVariant({ variant, size, className });
  if (type === "a") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={classname}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  if (type === "link") {
    return (
      <Link
        href={link || ""}
        className={classname}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  if (type === "button") {
    return (
      <button
        type="button"
        className={classname}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
  if (type === "buttonSubmit") {
    return (
      <button
        type="submit"
        className={classname}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
  return null;
}
