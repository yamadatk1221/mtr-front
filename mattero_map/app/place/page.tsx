"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { place } from "@/domain/place";
import { placeDetail } from "@/domain/placeDetail";
import { Stack, Text, Badge } from "@mantine/core";

export default function PlacePage() {
  // クエリパラメータ取得
  const sp = useSearchParams();
  // id パラメータ
  const id = sp.get("id");
  // ルーター
  const router = useRouter();
  // 場所詳細
  //const [place, setPlace] = useState<place>();
  const placeDetail: placeDetail = {
    place: {
      id: "1",
      name: "Sample Place",
      lng: 139.6917,
      lat: 35.6895,
      visitedAt: "2024-01-01",
      memo: "This is a sample place.",
      categoryName: "Traning",
      isPublic: true,
      value: 5,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    placeHistories: [
      {
        id: "h1",
        placeId: "1",
        visitedAt: "2024-01-01",
        memo: "First visit",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "h2",
        placeId: "1",
        visitedAt: "2024-02-01",
        memo: "Second visit",
        createdAt: "2024-02-01T00:00:00Z",
        updatedAt: "2024-02-01T00:00:00Z",
      },
    ],
    placeFiles: [
      {
        id: "f1",
        placeId: "1",
        fileUrl: "/images/sampleImage.jpeg",
        fileName: "sampleImage.jpeg",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ],
  };

  return (
    <main style={{ position: "relative", padding: 12 }}>
      {id ? (
        <div>
          <Stack gap="xs">
            <Text fw={600} lineClamp={2}>
              {placeDetail.place.name}
            </Text>

            {placeDetail.place.categoryName && (
              <Badge variant="light">★ {placeDetail.place.categoryName}</Badge>
            )}

            {placeDetail.placeFiles.length > 0 && (
              <div>
                <img
                  src={placeDetail.placeFiles[0].fileUrl}
                  alt={placeDetail.placeFiles[0].fileName}
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </div>
            )}

            {placeDetail.place.visitedAt && (
              <Text size="sm" c="dimmed">
                {placeDetail.place.visitedAt}
              </Text>
            )}

            {placeDetail.place.memo && (
              <Text size="sm" lineClamp={2}>
                {placeDetail.place.memo}
              </Text>
            )}
          </Stack>
          <button onClick={() => router.back()} style={btn()}>
            ← Back
          </button>
        </div>
      ) : (
        <>
          <p>id がありません</p>
          <p>
            例：<code>/place?id=123</code>
          </p>
          <button onClick={() => router.push("/")} style={btn()}>
            ホームへ
          </button>
        </>
      )}
    </main>
  );
}

function btn(): React.CSSProperties {
  return {
    padding: "12px",
    marginTop: "24px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 300,
  };
}
