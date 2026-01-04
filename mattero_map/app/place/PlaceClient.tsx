"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Stack, Text, Badge } from "@mantine/core";
import { StarRating } from "@/components/StarRating";
import { VisitHistoryItem } from "@/components/VisitHistoryItem";
import { placeDetail } from "@/domain/placeDetail";

export default function PlaceClient() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const router = useRouter();

  // （以下、今のPlacePageの中身をそのまま）
  const placeDetail: placeDetail = {
    place: {
      id: "1",
      name: "RE1 PRIVATEGYM",
      lng: 139.6917,
      lat: 35.6895,
      visitedAt: "2024-01-01",
      memo: "最寄り駅は四谷三丁目駅で、徒歩たったの1分。",
      categoryName: "筋トレ",
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
        memo: "ベンチ\nふじこ：90kg、あらこ：80kg、やまだ：70kg\nスクワット\nふじこ：90kg、あらこ：80kg、やまだ：70kg",
        cost: 3000,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "h2",
        placeId: "1",
        visitedAt: "2024-02-01",
        memo: "ベンチ\nふじこ：90kg、あらこ：80kg、やまだ：70kg\nスクワット\nふじこ：90kg、あらこ：80kg、やまだ：70kg",
        cost: 5000,
        createdAt: "2024-02-01T00:00:00Z",
        updatedAt: "2024-02-01T00:00:00Z",
      },
    ],
    placeFiles: [
      {
        id: "f1",
        placeId: "1",
        fileUrl: "/images/sample1.webp",
        fileName: "sample1.webp",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "f2",
        placeId: "1",
        fileUrl: "/images/sample2.webp",
        fileName: "sample2.webp",
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
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {placeDetail.placeFiles.map((file) => (
                  <img
                    key={file.id}
                    src={file.fileUrl}
                    alt={file.fileName}
                    style={{
                      height: 200,
                      flex: "0 0 auto",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            )}
          </Stack>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>History</h3>
            <button
              onClick={() =>
                router.push(
                  `/place/history/add?placeId=${placeDetail.place.id}`
                )
              }
              style={addMiniBtn()}
              type="button"
            >
              ＋ Add
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {placeDetail.placeHistories
              .slice()
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
          </div>

          <button onClick={() => router.back()} style={btn()} type="button">
            ← Back
          </button>
        </div>
      ) : (
        <>
          <p>id がありません</p>
          <p>
            例：<code>/place?id=123</code>
          </p>
          <button onClick={() => router.push("/")} style={btn()} type="button">
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

function addMiniBtn(): React.CSSProperties {
  return {
    padding: "6px 10px",
    borderRadius: 9999,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: "nowrap",
  };
}
