import { getPhoto } from "@/lib/photos";

/**
 * Streams the original file with a Content-Disposition header so the browser
 * saves it instead of opening it (the HTML `download` attribute is ignored for
 * cross-origin URLs). Only ids from the catalogue are served — this is not an
 * open proxy.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const photo = getPhoto((await params).id);
  if (!photo) return new Response("Not found", { status: 404 });

  const upstream = await fetch(photo.src, { redirect: "follow" }).catch(() => null);
  if (!upstream?.ok || !upstream.body) {
    // Fall back to opening the image directly.
    return Response.redirect(photo.src, 302);
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      "Content-Disposition": `attachment; filename="${photo.id}.jpg"`,
      "Cache-Control": "public, max-age=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
