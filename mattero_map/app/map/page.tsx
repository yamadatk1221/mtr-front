"use client";

import { useState } from "react";
import MapView from "./components/MapView";

export default function Home() {
  const [lastTap, setLastTap] = useState<{ lat: number; lng: number } | null>(
    null
  );

  return (
    <main style={{ position: "relative" }}>
      <MapView onMapTap={(p) => setLastTap(p)} />

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
            onClick={() => alert("ここから登録フォームへ")}
          >
            この場所を登録
          </button>
        </div>
      )}
    </main>
  );
}
