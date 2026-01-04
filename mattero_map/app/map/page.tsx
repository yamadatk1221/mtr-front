"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MapView from "./components/MapView";
import { PlaceCard } from "@/components/PlaceCard";
import { place } from "@/domain/place";
import { useDisclosure } from "@mantine/hooks";
import { Input, Radio, Group, Modal } from "@mantine/core";

// ★ サンプルデータ（東京駅周辺〜都内に散らす）
const SAMPLE_PLACES: place[] = [
  {
    id: "p1",
    name: "IRON BASE TOKYO",
    lng: 139.7671,
    lat: 35.6812,
    visitedAt: "2024-01-01",
    memo: "フリーウェイトが充実。\n朝トレが快適。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.6,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "p2",
    name: "POWER LIFT GINZA",
    lng: 139.767,
    lat: 35.6717,
    visitedAt: "2024-02-10",
    memo: "ベンチ台が多くて助かる。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.2,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "p3",
    name: "MUSCLE FACTORY SHIMBASHI",
    lng: 139.7586,
    lat: 35.6662,
    visitedAt: "2024-03-15",
    memo: "仕事帰りにちょうどいい。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.0,
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "p4",
    name: "BULK UP GYM SHIBUYA",
    lng: 139.7016,
    lat: 35.658,
    visitedAt: "2024-04-02",
    memo: "人は多いが刺激になる。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.3,
    createdAt: "2024-04-02T00:00:00Z",
    updatedAt: "2024-04-02T00:00:00Z",
  },
  {
    id: "p5",
    name: "IRON TEMPLE SHINJUKU",
    lng: 139.7006,
    lat: 35.6896,
    visitedAt: "2024-05-20",
    memo: "マシンの種類が豊富。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.1,
    createdAt: "2024-05-20T00:00:00Z",
    updatedAt: "2024-05-20T00:00:00Z",
  },
  {
    id: "p6",
    name: "STEEL BODY AKIHABARA",
    lng: 139.773,
    lat: 35.6987,
    visitedAt: "2024-06-08",
    memo: "深夜でも空いてる。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.0,
    createdAt: "2024-06-08T00:00:00Z",
    updatedAt: "2024-06-08T00:00:00Z",
  },
  {
    id: "p7",
    name: "POWER ZONE UENO",
    lng: 139.7765,
    lat: 35.7138,
    visitedAt: "2024-07-12",
    memo: "脚トレの日に使う。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.2,
    createdAt: "2024-07-12T00:00:00Z",
    updatedAt: "2024-07-12T00:00:00Z",
  },
  {
    id: "p8",
    name: "HARDCORE GYM ASAKUSA",
    lng: 139.7966,
    lat: 35.7148,
    visitedAt: "2024-08-01",
    memo: "雰囲気がストロング系。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.4,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "p9",
    name: "IRON WORKS SHINAGAWA",
    lng: 139.7388,
    lat: 35.6285,
    visitedAt: "2024-09-09",
    memo: "出張前の短時間トレ。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 3.9,
    createdAt: "2024-09-09T00:00:00Z",
    updatedAt: "2024-09-09T00:00:00Z",
  },
  {
    id: "p10",
    name: "BULK LAB KAMATA",
    lng: 139.716,
    lat: 35.5623,
    visitedAt: "2024-10-21",
    memo: "地元感あって落ち着く。",
    categoryName: "筋トレ",
    isPublic: true,
    value: 4.1,
    createdAt: "2024-10-21T00:00:00Z",
    updatedAt: "2024-10-21T00:00:00Z",
  },
];

export default function Home() {
  // 場所リスト
  const [places, setPlaces] = useState<place[]>([]);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);
  // ルーター
  const router = useRouter();
  // 最後にタップした場所（仮ピン用）
  const [lastTap, setLastTap] = useState<{ lat: number; lng: number } | null>(
    null
  );
  // 登録モーダルの開閉
  const [opened, { open, close }] = useDisclosure(false);
  // 選択中の場所
  const [selectedPlace, setSelectedPlace] = useState<place | null>(null);

  // ★ 初回はサンプルを直で入れる（API呼ばない）
  useEffect(() => {
    setError(null);
    setPlaces(SAMPLE_PLACES);
  }, []);

  /* UI */
  return (
    <main style={{ position: "relative" }}>
      {error && <div style={{ padding: 12, color: "crimson" }}>{error}</div>}

      <div style={{ padding: 12 }}>
        <Group>
          <Radio checked label="public" />
          <Radio label="private" />
        </Group>
      </div>

      <div style={{ padding: 12 }}>
        <Input.Wrapper label="Adress">
          <Group gap="xs" align="flex-end">
            <Input size="xs" placeholder="ex) Tokyo" style={{ flex: 1 }} />
            <button
              type="button"
              onClick={() => {
                // 検索処理（後で）
              }}
              style={searchBtn()}
            >
              Search
            </button>
          </Group>
        </Input.Wrapper>
      </div>

      <div>
        <MapView
          places={places}
          onMapTap={(p) => setLastTap(p)}
          tempPin={lastTap}
          onPlaceTap={(pl) => {
            setSelectedPlace(pl);
            setLastTap(null); // 仮ピンUI
          }}
        />
      </div>

      {selectedPlace && (
        <div
          style={{
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            maxWidth: "calc(100vw - 24px)",
            width: 360,
          }}
        >
          <div style={{ position: "relative" }}>
            <PlaceCard
              place={selectedPlace}
              onClick={() => {
                router.push(`/place?id=${selectedPlace.id}`);
              }}
            />

            <button
              onClick={() => setSelectedPlace(null)}
              aria-label="close place card"
              title="閉じる"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 36,
                height: 36,
                borderRadius: 9999,
                border: "none",
                background: "rgba(0,0,0,0.55)",
                color: "white",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 動作確認用 */}
      {lastTap && (
        <div
          style={{
            position: "fixed",
            left: 12,
            right: 12,
            bottom: `calc(60px + env(safe-area-inset-bottom))`,
            padding: 12,
            borderRadius: 12,
            background: "rgba(17, 12, 12, 0.75)",
            color: "white",
          }}
        >
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

  function searchBtn(): React.CSSProperties {
    return {
      padding: "6px 12px",
      borderRadius: 3,
      border: "1px solid #ddd",
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      whiteSpace: "nowrap",
    };
  }
}
