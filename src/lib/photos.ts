/**
 * Data access layer. Every page reads photos through these helpers, so to move
 * to a CMS / database you only need to change this file (make the functions
 * async and fetch from your source).
 */
import { categories, rawPhotos, type Category, type CategorySlug, type RawPhoto } from "@/data/photos";

export type { Category, CategorySlug };

export interface Photo extends Omit<RawPhoto, "src" | "width" | "height" | "description"> {
  src: string;
  width: number;
  height: number;
  description: string;
  categoryName: string;
}

/** Lightweight shape for cards and widgets. */
export type PhotoSummary = Pick<Photo, "id" | "title" | "caption" | "src" | "width" | "height" | "category" | "categoryName" | "views">;

// Varying aspect ratios give the masonry grid its Pinterest look.
const DEMO_SIZES: Array<[number, number]> = [
  [1600, 2400],
  [2400, 1600],
  [2000, 2000],
  [1600, 2000],
  [2400, 1350],
];

const CATEGORY_CONTEXT: Record<CategorySlug, string> = {
  nature:
    "Nature photography rewards patience more than any piece of equipment. Light changes minute by minute, weather rarely cooperates, and the best scenes often last only moments before clouds roll in or the sun climbs too high.",
  travel:
    "Great travel photography tells the story of a place and the people who call it home. It captures the atmosphere you feel when you step off the plane — the sounds, colours and everyday rhythms that make a destination unique.",
  architecture:
    "Architectural photography is all about lines, symmetry and perspective. Careful framing turns concrete, glass and stone into compositions that reveal how the architect played with light, space and scale.",
  animals:
    "Photographing animals requires respect, timing and a good understanding of behaviour. Whether wild or domestic, the most memorable animal portraits show personality and a genuine moment rather than a staged pose.",
  food:
    "Food photography is designed to make you hungry. Styling, natural light and the right angle work together to highlight texture, freshness and colour so the dish looks just as good as it tastes.",
  abstract:
    "Abstract photography invites you to look beyond the subject and focus on shape, colour and texture. Without an obvious story, every viewer is free to find their own meaning in the image.",
};

function buildDescription(p: RawPhoto, categoryName: string): string {
  const tags = p.tags.slice(0, 3).join(", ");
  return [
    `${p.title} is a high-resolution ${categoryName.toLowerCase()} photograph captured in ${p.location} by ${p.photographer}. ${p.caption} ${p.story}`,
    CATEGORY_CONTEXT[p.category],
    `This frame was made with a ${p.camera} using ${p.settings}. Those settings balance sharpness, depth and exposure so fine details remain crisp even when you zoom in or download the full HD version for a large screen, print or wallpaper.`,
    `If you enjoy ${tags} imagery, this photo works beautifully as a desktop or phone background, a blog header, a mood-board reference or simply as inspiration for your next photography trip. The original file keeps its natural colours with only light editing, making it easy to crop for social media posts, Pinterest pins or presentation slides.`,
    `Use the Next and Previous buttons to browse the gallery photo by photo, open the full album for more ${categoryName.toLowerCase()} shots, or scroll down to discover related images you may also like.`,
  ].join("\n\n");
}

const CATEGORY_BY_SLUG = new Map(categories.map((c) => [c.slug, c]));

const PHOTOS: Photo[] = rawPhotos
  .map((p, i) => {
    const [w, h] = DEMO_SIZES[i % DEMO_SIZES.length];
    const categoryName = CATEGORY_BY_SLUG.get(p.category)?.name ?? p.category;
    return {
      ...p,
      width: p.width ?? w,
      height: p.height ?? h,
      src: p.src ?? `https://picsum.photos/seed/${p.id}/${w}/${h}`,
      description: p.description ?? buildDescription(p, categoryName),
      categoryName,
    };
  })
  // Newest first.
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const PHOTO_BY_ID = new Map(PHOTOS.map((p) => [p.id, p]));

export function toSummary(p: Photo): PhotoSummary {
  const { id, title, caption, src, width, height, category, categoryName, views } = p;
  return { id, title, caption, src, width, height, category, categoryName, views };
}

export function getAllPhotos(): Photo[] {
  return PHOTOS;
}

export function getPhoto(id: string): Photo | undefined {
  return PHOTO_BY_ID.get(id);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_BY_SLUG.get(slug as CategorySlug);
}

export interface PhotoQuery {
  q?: string;
  category?: string;
}

export function searchPhotos({ q, category }: PhotoQuery): Photo[] {
  const needle = q?.trim().toLowerCase();
  return PHOTOS.filter((p) => {
    if (category && p.category !== category) return false;
    if (!needle) return true;
    const haystack = [p.title, p.caption, p.location, p.photographer, p.categoryName, ...p.tags].join(" ").toLowerCase();
    return needle.split(/\s+/).every((word) => haystack.includes(word));
  });
}

export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
}

export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  return {
    items: items.slice((current - 1) * pageSize, current * pageSize),
    page: current,
    totalPages,
    total: items.length,
  };
}

/**
 * Previous / next photo for the slideshow navigation. The list wraps around,
 * so the last photo links back to the first — an endless browsing loop.
 */
export function getAdjacentPhotos(id: string): { prev: Photo; next: Photo; index: number; total: number } {
  const index = Math.max(0, PHOTOS.findIndex((p) => p.id === id));
  const total = PHOTOS.length;
  return {
    prev: PHOTOS[(index - 1 + total) % total],
    next: PHOTOS[(index + 1) % total],
    index,
    total,
  };
}

/** Same category first, then shared tags, excluding the photo itself. */
export function getRelatedPhotos(photo: Photo, limit = 8): Photo[] {
  return PHOTOS.filter((p) => p.id !== photo.id)
    .map((p) => ({
      p,
      score: (p.category === photo.category ? 3 : 0) + p.tags.filter((t) => photo.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.p.views - a.p.views)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Highest view counts. Replace `views` with real analytics in production. */
export function getTrendingPhotos(limit = 6, excludeId?: string): Photo[] {
  return [...PHOTOS]
    .filter((p) => p.id !== excludeId)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

/**
 * Pseudo-random selection. Seeded so server and client render the same HTML;
 * pass a seed that changes over time (e.g. the current hour) to rotate it.
 */
export function getRandomPhotos(limit = 6, seed = "", excludeIds: string[] = []): Photo[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  const pool = PHOTOS.filter((p) => !excludeIds.includes(p.id));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, limit);
}

export function getRandomPhotoId(): string {
  return PHOTOS[Math.floor(Math.random() * PHOTOS.length)].id;
}
