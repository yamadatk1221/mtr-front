"use client";

import { useState } from "react";
import MapView from "./components/MapView";
import { PlaceCard } from "@/components/PlaceCard";
import { place } from "@/domain/place";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const places: place[] = [
  {
    id: "1",
    name: "東京駅",
    lat: 35.681236,
    lng: 139.767125,
    visitedAt: new Date("2024-07-01"),
    memo: "",
    categoryName: "観光",
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "渋谷GYM",
    lat: 35.6595,
    lng: 139.7005,
    visitedAt: new Date("2024-06-15"),
    memo: "スミスマシンがなかった",
    categoryName: "筋トレ",
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "蒲田GYM",
    lat: 35.562,
    lng: 139.716,
    visitedAt: new Date("2024-06-15"),
    memo: "フリーウェイトが充実してた",
    categoryName: "筋トレ",
    isPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [lastTap, setLastTap] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <main style={{ position: "relative" }}>
      <div style={{ padding: 12 }}>
        <PlaceCard place={places[0]} onClick={() => alert("tap")} />
      </div>

      <MapView
        places={places}
        onMapTap={(p) => setLastTap(p)}
        tempPin={lastTap}
      />

      {/* まずは動作確認用。後でshadcn/uiのSheetに置き換える想定 */}
      {lastTap && (
        <div
          style={{
            position: "fixed",
            left: 12,
            right: 12,
            bottom: `calc(60px + env(safe-area-inset-bottom))`, // Nアイコンと被りづらく + セーフエリア考慮
            padding: 12,
            borderRadius: 12,
            background: "rgba(17, 12, 12, 0.75)",
            color: "white",
          }}
        >
          {/* ボタン行：左に登録、右に閉じる */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 8,
              gap: 8,
            }}
          >
            <button
              style={{
                padding: "8px 12px",
                borderRadius: 10,
              }}
              onClick={open}
            >
              この場所を登録
            </button>

            <button
              onClick={() => setLastTap(null)}
              style={{
                marginLeft: "auto",
                padding: "8px 12px",
                borderRadius: 10,
                background: "transparent",
                color: "white",
                border: "none",
                fontSize: 16,
                cursor: "pointer",
              }}
              aria-label="close"
              title="close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Modal opened={opened} onClose={close} title="register place">
        {/* Modal content */}
      </Modal>
    </main>
  );
}
