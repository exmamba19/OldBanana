/**
 * ADSTERRA DIRECT LINK UTILITIES
 *
 * Strategy used by <DirectLinkButton>: when the visitor clicks a CTA such as
 * "Download HD Quality", the Adsterra Direct Link opens in a NEW tab while the
 * CURRENT tab continues to the real destination. The visitor always gets what
 * they clicked for, and a per-slot cooldown keeps it from firing on every click.
 */
import { adsConfig, type DirectLinkSlot } from "@/config/ads";

const STORAGE_PREFIX = "dl-last-";

export function getDirectLink(slot: DirectLinkSlot): string {
  return adsConfig.directLinks[slot] || "";
}

function readTimestamp(slot: DirectLinkSlot): number {
  try {
    return Number(window.localStorage.getItem(STORAGE_PREFIX + slot)) || 0;
  } catch {
    return 0; // storage blocked (private mode etc.) — treat as never opened
  }
}

function writeTimestamp(slot: DirectLinkSlot) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + slot, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/** True when the Direct Link for this slot should open on the current click. */
export function shouldOpenDirectLink(slot: DirectLinkSlot): boolean {
  if (!getDirectLink(slot)) return false;
  const cooldownMs = Math.max(0, adsConfig.directLinkCooldownMinutes) * 60_000;
  return cooldownMs === 0 || Date.now() - readTimestamp(slot) > cooldownMs;
}

/**
 * Opens the Direct Link in a new tab. Must be called synchronously inside a
 * click handler, otherwise the browser's popup blocker will stop it.
 * Returns true if an open was attempted.
 */
export function openDirectLink(slot: DirectLinkSlot): boolean {
  if (!shouldOpenDirectLink(slot)) return false;
  // With "noopener" window.open returns null even on success, so blocking can't be detected.
  window.open(getDirectLink(slot), "_blank", "noopener,noreferrer");
  writeTimestamp(slot);
  return true;
}
