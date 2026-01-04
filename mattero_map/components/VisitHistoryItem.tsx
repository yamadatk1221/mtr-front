// src/components/VisitHistoryItem.tsx
"use client";

import { useState } from "react";

type VisitHistoryItemProps = {
  id: string;
  visitedAt: string;
  memo?: string | null;
  cost?: number | null;
};

export function VisitHistoryItem({
  id,
  visitedAt,
  memo,
  cost,
}: VisitHistoryItemProps) {
  const date = new Date(visitedAt);
  const [open, setOpen] = useState(false);

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
      {/* ヘッダー：日付 + 金額 + 開閉 */}
      <button
        type="button"
        onClick={() => memo && setOpen((v) => !v)}
        style={{
          all: "unset",
          cursor: memo ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        aria-expanded={open}
      >
        <div style={{ fontSize: 12, fontWeight: 700 }}>{formatDate(date)}</div>

        {cost != null && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0f766e",
            }}
          >
            ￥{formatYen(cost)}
          </div>
        )}

        {/* 右寄せの開閉アイコン */}
        {memo && (
          <div
            style={{
              marginLeft: "auto",
              fontSize: 12,
              opacity: 0.6,
            }}
          >
            {open ? "▲" : "▼"}
          </div>
        )}
      </button>

      {/* メモ（アコーディオン） */}
      {memo && open && (
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            paddingTop: 4,
          }}
        >
          {memo}
        </div>
      )}

      {!memo && <div style={{ fontSize: 13, opacity: 0.6 }}>メモなし</div>}
    </div>
  );
}

function formatDate(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function formatYen(cost: number) {
  return cost.toLocaleString("ja-JP");
}
