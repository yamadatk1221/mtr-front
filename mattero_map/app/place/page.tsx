"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { place } from "@/domain/place";
import { placeDetail } from "@/domain/placeDetail";
import { Stack, Text, Badge } from "@mantine/core";
import { StarRating } from "@/components/StarRating";
import { VisitHistoryItem } from "@/components/VisitHistoryItem";

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
        cost: 3000,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "h2",
        placeId: "1",
        visitedAt: "2024-02-01",
        memo: "Second visit",
        cost: 5000,
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
      {id && (
        <button
          onClick={() => router.push(`/place/edit?id=${id}`)}
          style={editBtn()}
          aria-label="edit"
          title="編集"
        >
          Edit
        </button>
      )}
      {id ? (
        <div>
          <Stack gap="sm">
            <Text fw={600} lineClamp={2}>
              {placeDetail.place.name}
            </Text>

            {placeDetail.place.categoryName && (
              <Badge variant="light">★ {placeDetail.place.categoryName}</Badge>
            )}
            <StarRating rating={placeDetail.place.value} showValue />

            {placeDetail.placeFiles.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                  paddingBottom: 4,
                  WebkitOverflowScrolling: "touch", // iOSでヌルっと
                }}
              >
                {placeDetail.placeFiles.map((file) => (
                  <img
                    key={file.fileUrl}
                    src={file.fileUrl}
                    alt={file.fileName}
                    style={{
                      height: 200, // 高さ固定が一番安定
                      flex: "0 0 auto", // 横に並べる
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                ))}
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
          <h3>History</h3>
          {placeDetail.placeHistories
            .sort(
              (a, b) =>
                new Date(b.visitedAt).getTime() -
                new Date(a.visitedAt).getTime()
            )
            .map((h) => (
              <VisitHistoryItem
                key={h.id}
                id={h.id}
                visitedAt={h.visitedAt}
                memo={h.memo}
                cost={h.cost}
              />
            ))}
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

function editBtn(): React.CSSProperties {
  return {
    position: "absolute",
    top: 12,
    right: 12,
    padding: "10px 20px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 300,
    zIndex: 50,
  };
}
