import { getRandomPhotoId } from "@/lib/photos";

/** /random -> 307 redirect to a random photo (a fresh page load every time). */
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return new Response(null, {
    status: 307,
    headers: {
      Location: new URL(`/photo/${getRandomPhotoId()}`, request.url).toString(),
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
