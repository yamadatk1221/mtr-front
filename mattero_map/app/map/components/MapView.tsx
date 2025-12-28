"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { place } from "@/domain/place";

type MapViewProps = {
  places: place[];
  onPlaceTap?: (pl: place) => void;
  onMapTap?: (p: { lat: number; lng: number }) => void;
  tempPin?: { lat: number; lng: number } | null;
};

export default function MapView({
  places,
  onPlaceTap,
  onMapTap,
  tempPin,
}: MapViewProps) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tempMarkerRef = useRef<maplibregl.Marker | null>(null);
  const placeMarkersRef = useRef<maplibregl.Marker[]>([]);
  const onPlaceTapRef = useRef<MapViewProps["onPlaceTap"]>(onPlaceTap);

  // ★ map が生成済みかどうか
  const [mapReady, setMapReady] = useState(false);

  // 最新の onMapTap を常に呼べるようにする（stale防止）
  const onMapTapRef = useRef<MapViewProps["onMapTap"]>(onMapTap);
  useEffect(() => {
    onMapTapRef.current = onMapTap;
  }, [onMapTap]);

  useEffect(() => {
    onPlaceTapRef.current = onPlaceTap;
  }, [onPlaceTap]);

  // タッチ開始地点（ドラッグ判定用）
  const touchStartPointRef = useRef<{ x: number; y: number } | null>(null);
  const touchMovedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const createMap = (lng: number, lat: number) => {
      const map = new maplibregl.Map({
        container: containerRef.current!,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [lng, lat],
        zoom: 14,
      });

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        "top-right"
      );

      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: false,
        }),
        "top-right"
      );

      // PC：click（ドラッグでは発火しない）
      map.on("click", (e) => {
        onMapTapRef.current?.({ lat: e.lngLat.lat, lng: e.lngLat.lng });
      });

      // スマホ：移動量でタップ/ドラッグを判定
      map.on("touchstart", (e) => {
        touchStartPointRef.current = { x: e.point.x, y: e.point.y };
        touchMovedRef.current = false;
      });

      map.on("touchmove", (e) => {
        const start = touchStartPointRef.current;
        if (!start) return;

        const dx = e.point.x - start.x;
        const dy = e.point.y - start.y;
        const dist2 = dx * dx + dy * dy;

        if (dist2 > 6 * 6) touchMovedRef.current = true;
      });

      map.on("touchend", (e) => {
        if (touchMovedRef.current) return;

        const ll = map.unproject(e.point);
        onMapTapRef.current?.({ lat: ll.lat, lng: ll.lng });
      });

      mapRef.current = map;
      setMapReady(true); // ★ 生成完了
    };

    const fallback = () => createMap(139.7671, 35.6812);

    if (!navigator.geolocation) {
      fallback();
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => createMap(pos.coords.longitude, pos.coords.latitude),
        fallback,
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 60_000,
        }
      );
    }

    return () => {
      // places markers cleanup
      placeMarkersRef.current.forEach((m) => m.remove());
      placeMarkersRef.current = [];

      // temp marker cleanup
      tempMarkerRef.current?.remove();
      tempMarkerRef.current = null;

      mapRef.current?.remove();
      mapRef.current = null;

      touchStartPointRef.current = null;
      touchMovedRef.current = false;

      setMapReady(false);
    };
  }, []);

  // ★ places が変わったらマーカーを更新（mapReadyも見る）
  useEffect(() => {
    if (!mapReady) return;

    const map = mapRef.current;
    if (!map) return;

    // いったん全消し
    placeMarkersRef.current.forEach((m) => m.remove());
    placeMarkersRef.current = [];

    // 作り直し
    placeMarkersRef.current = places.map((pl) => {
      const marker = new maplibregl.Marker({ anchor: "bottom" })
        .setLngLat([pl.lng, pl.lat])
        .addTo(map);

      const el = marker.getElement();
      el.style.cursor = "pointer";

      // PC：click
      el.addEventListener("click", (e) => {
        e.stopPropagation(); // ← 地図の click に伝えない
        onPlaceTapRef.current?.(pl);
      });

      // スマホ（これがないと map.touchend が動く）
      el.addEventListener(
        "touchend",
        (e) => {
          e.stopPropagation();
          e.preventDefault(); // ここ大事（クリック合成を防ぐ）
          onPlaceTapRef.current?.(pl);
        },
        { passive: false }
      );

      // iOS/一部端末で有効：pointer系も止める
      el.addEventListener("pointerup", (e) => {
        e.stopPropagation();
        onPlaceTapRef.current?.(pl);
      });

      return marker;
    });
  }, [places, mapReady]);

  // tempPin が変わったらピン表示（または更新）
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!tempPin) {
      tempMarkerRef.current?.remove();
      tempMarkerRef.current = null;
      return;
    }

    const lngLat: [number, number] = [tempPin.lng, tempPin.lat];

    if (!tempMarkerRef.current) {
      tempMarkerRef.current = new maplibregl.Marker({
        anchor: "bottom",
        offset: [0, 6],
        color: "#ff6b6b",
      })
        .setLngLat(lngLat)
        .addTo(map);
    } else {
      tempMarkerRef.current.setLngLat(lngLat);
    }
  }, [tempPin]);

  return <div ref={containerRef} style={{ height: "100dvh", width: "100%" }} />;
}
