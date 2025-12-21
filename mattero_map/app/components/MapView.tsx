"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";

export default function MapView() {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current!,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [139.7671, 35.6812],
      zoom: 14,
    });

    // ズームコントロール
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    // 現在地ボタン
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100dvh", width: "100%" }} />;
}
