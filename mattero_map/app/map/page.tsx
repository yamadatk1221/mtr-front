"use client";

import { useState } from "react";
import MapView from "./components/MapView";
import { PlaceCard } from "@/components/PlaceCard";
import { place } from "@/domain/place";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openModal } from "@mantine/modals";

const dummy: place = {
  id: "1",
  name: "渋谷GYM",
  lat: 35.6595,
  lng: 139.7005,
  visitedAt: new Date("2024-06-15"),
  memo: "スミスマシンがなかった",
  categoryName: "筋トレ",
  isPublic: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Home() {
  const [lastTap, setLastTap] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <main style={{ position: "relative" }}>
      <div style={{ padding: 12 }}>
        <PlaceCard place={dummy} onClick={() => alert("tap")} />
      </div>
      <MapView onMapTap={(p) => setLastTap(p)} tempPin={lastTap} />

      {/* まずは動作確認用。後でshadcn/uiのSheetに置き換える想定 */}
      {lastTap && (
        <div
          style={{
            position: "fixed",
            left: 12,
            right: 12,
            bottom: 12,
            padding: 12,
            borderRadius: 12,
            background: "rgba(0,0,0,0.75)",
            color: "white",
          }}
        >
          <div>
            Tap: lat {lastTap.lat.toFixed(6)} / lng {lastTap.lng.toFixed(6)}
          </div>
          <button
            style={{ marginTop: 8, padding: "8px 12px", borderRadius: 10 }}
            onClick={open}
          >
            この場所を登録
          </button>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="register place">
        {/* Modal content */}
      </Modal>
    </main>
  );
}
