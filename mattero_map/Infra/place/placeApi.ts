import type { place } from "@/domain/place";

type SimpleResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export async function fetchPlaces(cond?: {
  isPublic?: boolean;
  categoryId?: number;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

  const url = new URL("/places", baseUrl);
  if (cond?.isPublic !== undefined)
    url.searchParams.set("isPublic", String(cond.isPublic));
  if (cond?.categoryId !== undefined)
    url.searchParams.set("categoryId", String(cond.categoryId));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`places api failed: ${res.status}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = (await res.json()) as SimpleResponse<any[]>;
  const data = json.data ?? [];

  // API → 画面用の型へ寄せる（今の place 型に合わせる）
  const mapped: place[] = data.map((p) => ({
    id: String(p.id),
    name: p.name,
    lat: typeof p.lat === "string" ? Number(p.lat) : p.lat,
    lng: typeof p.lng === "string" ? Number(p.lng) : p.lng,
    memo: p.memo ?? "",
    visitedAt: p.visitedAt ?? "",
    categoryName: p.categoryName ?? "",
    isPublic: !!p.isPublic,
    value: Number(p.value ?? 0),
    createdAt: p.createdAt ?? "",
    updatedAt: p.updatedAt ?? "",
  }));

  return mapped;
}
