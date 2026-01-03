"use client";

import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import { PlaceCard } from "@/components/PlaceCard";
import { place } from "@/domain/place";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { fetchPlaces } from "@/Infra/place/placeApi";

export default function Home() {
  const [lastTap, setLastTap] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPlace, setSelectedPlace] = useState<place | null>(null);

  const [places, setPlaces] = useState<place[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlaces({ isPublic: true }) // 例：公開だけ
      .then(setPlaces)
      .catch((e) => setError(String(e)));
  }, []);

  /* UI */
  return (
    <main style={{ position: "relative" }}>
      {error && <div style={{ padding: 12, color: "crimson" }}>{error}</div>}
      {/* <div style={{ padding: 12 }}>
        <PlaceCard place={places[0]} onClick={() => alert("tap")} />
      </div> */}

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
            left: 12,
            right: 12,
            top: 12,
            zIndex: 20,
          }}
        >
          <div style={{ position: "relative" }}>
            <PlaceCard place={selectedPlace} onClick={() => {}} />

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
