"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";

type MapViewProps = {
  onMapTap?: (p: { lat: number; lng: number }) => void;
};

export default function MapView({ onMapTap }: MapViewProps) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  return <div ref={containerRef} style={{ height: "100dvh", width: "100%" }} />;
}
