"use client";

/**
 * DIRECT LINK WRAPPER for CTA buttons ("Download HD Quality", "View Full Album").
 *
 *   <DirectLinkButton slot="download" href={`/download/${photo.id}`}>Download HD</DirectLinkButton>
 *
 * - `href` is the real destination and is always followed (SEO-friendly <a>).
 * - The Adsterra Direct Link for `slot` (src/config/ads.ts -> directLinks)
 *   opens in a new tab on click, respecting the cooldown.
 * - With no Direct Link configured it behaves like a normal link.
 */
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import type { DirectLinkSlot } from "@/config/ads";
import { openDirectLink } from "@/lib/directLink";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  slot: DirectLinkSlot;
  href: string;
  children: ReactNode;
}

export function DirectLinkButton({ slot, href, onClick, children, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    // Let modified clicks (new tab, etc.) behave normally.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    openDirectLink(slot);
    // Default navigation to `href` continues in the current tab.
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
