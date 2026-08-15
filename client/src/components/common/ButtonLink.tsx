"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The one place `Button asChild` wraps a `next/link`.
 *
 * This file is a client leaf on purpose. Chakra's `asChild` calls `React.Children.only` on its child,
 * and when the composition is authored inside a *server* component the `<Link>` arrives as a
 * `React.lazy` client reference rather than a plain element — `Children.only` rejects it and the page
 * throws during prerender (`React.Children.only expected to receive a single React element child`).
 * Keeping the Button and the Link in the same client module means the child is always a real element.
 *
 * Do not inline `<Button asChild><Link/></Button>` anywhere else; compose this instead.
 */
export type ButtonLinkVariant = "solid" | "outline" | "ghost";

/**
 * Which background the control sits on. The button recipe's `action.700` text passes contrast on light
 * surfaces only — it measures 2.3:1 on navy.900 and 3.7:1 on brightTeal.500, so the surface must be
 * declared rather than assumed. Pass it wherever a control sits on a `navy` or `brightTeal` section.
 */
export type Surface = "light" | "dark" | "brand";

const surfaceOverrides: Record<Surface, Partial<Record<ButtonLinkVariant, Record<string, unknown>>>> = {
  light: {},
  // navy.900 — white and whiteAlpha carry the contrast.
  dark: {
    ghost: { color: "white", _hover: { bg: "whiteAlpha.200", color: "white" } },
    outline: { borderColor: "whiteAlpha.500", color: "white", _hover: { bg: "whiteAlpha.200", borderColor: "white" } },
  },
  // brightTeal.500 — a *light* surface, but too saturated for the teal action scale; navy carries it.
  brand: {
    solid: { bg: "navy.900", color: "white", _hover: { bg: "navy.800" } },
    outline: { borderColor: "navy.900", color: "navy.900", _hover: { bg: "whiteAlpha.400", borderColor: "navy.900" } },
    ghost: { color: "navy.900", _hover: { bg: "whiteAlpha.400" } },
  },
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "lg",
  surface = "light",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  size?: "sm" | "lg";
  surface?: Surface;
}) {
  const overrides = surfaceOverrides[surface][variant] ?? {};

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      minH="44px"
      css={{
        "& svg": {
          transitionProperty: "transform",
          transitionDuration: "fast",
          transitionTimingFunction: "standard",
        },
        "&:hover svg": { transform: "translateX(3px)" },
        "@media (prefers-reduced-motion: reduce)": { "&:hover svg": { transform: "none" } },
      }}
      {...overrides}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
