"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";

type MapViewProps = {
  onMapTap?: (p: { lat: number; lng: number }) => void;
  tempPin?: { lat: number; lng: number } | null;
};

export default function MapView({ onMapTap, tempPin }: MapViewProps) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tempMarkerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [139.7671, 35.6812],
      zoom: 14,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    );

    map.on("click", (e) => {
      onMapTap?.({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onMapTap]);

  // ★ tempPin が変わったら、ピン表示（または更新）
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!tempPin) {
      // クリアしたい場合
      tempMarkerRef.current?.remove();
      tempMarkerRef.current = null;
      return;
    }

    const lngLat: [number, number] = [tempPin.lng, tempPin.lat];

    if (!tempMarkerRef.current) {
      tempMarkerRef.current = new maplibregl.Marker({ color: "#309bffff" })
        .setLngLat(lngLat)
        .addTo(map);
    } else {
      tempMarkerRef.current.setLngLat(lngLat);
    }
  }, [tempPin]);

  return <div ref={containerRef} style={{ height: "100dvh", width: "100%" }} />;
}
