// src/components/VisitHistoryItem.tsx
"use client";

type VisitHistoryItemProps = {
  id: string;
  visitedAt: string;
  memo?: string | null;
  cost?: number | null; // ★追加
};

export function VisitHistoryItem({
  id,
  visitedAt,
  memo,
  cost,
}: VisitHistoryItemProps) {
  const date = new Date(visitedAt);

  return (
    <div
      key={id}
      style={{
        borderRadius: 12,
        marginBottom: 5,
        padding: "10px 12px",
        background: "#f6f6f6",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {/* 日付 + 金額 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700 }}>{formatDate(date)}</div>

        {cost != null && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0f766e", // 少し強調（お好みで）
            }}
          >
            ￥{formatYen(cost)}
          </div>
        )}
      </div>

      {/* メモ */}
      {memo ? (
        <div style={{ fontSize: 14, lineHeight: 1.5 }}>{memo}</div>
      ) : (
        <div style={{ fontSize: 13, opacity: 0.6 }}>メモなし</div>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function formatYen(cost: number) {
  // 12345 → "12,345"
  return cost.toLocaleString("ja-JP");
}
