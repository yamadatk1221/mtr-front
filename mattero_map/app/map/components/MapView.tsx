"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MapViewProps = {
  onMapTap?: (p: { lat: number; lng: number }) => void;
  tempPin?: { lat: number; lng: number } | null;
};

export default function MapView({ onMapTap, tempPin }: MapViewProps) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tempMarkerRef = useRef<maplibregl.Marker | null>(null);

  // 最新の onMapTap を常に呼べるようにする（stale防止）
  const onMapTapRef = useRef<MapViewProps["onMapTap"]>(onMapTap);
  useEffect(() => {
    onMapTapRef.current = onMapTap;
  }, [onMapTap]);

  // タッチ開始地点（ドラッグ判定用）
  const touchStartPointRef = useRef<{ x: number; y: number } | null>(null);
  const touchMovedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const createMap = (lng: number, lat: number) => {
      const map = new maplibregl.Map({
        container: containerRef.current!,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [lng, lat], // ★ 初期表示の中心
        zoom: 14,
      });

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        "top-right"
      );

      // （任意）現在地ボタンも置きたい場合はON
      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: false, // “追従”ではなくボタンで取得する感じ
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

        // しきい値：6px（必要なら8〜10に上げてOK）
        if (dist2 > 6 * 6) touchMovedRef.current = true;
      });

      map.on("touchend", (e) => {
        if (touchMovedRef.current) return; // ★ ドラッグ後にピンを立てない

        const ll = map.unproject(e.point);
        onMapTapRef.current?.({ lat: ll.lat, lng: ll.lng });
      });

      mapRef.current = map;
    };

    // ★ 現在地を取得してから map を生成（失敗したらフォールバック）
    const fallback = () => createMap(139.7671, 35.6812); // 東京駅

    if (!navigator.geolocation) {
      fallback();
      return () => {
        tempMarkerRef.current?.remove();
        tempMarkerRef.current = null;

        mapRef.current?.remove();
        mapRef.current = null;

        touchStartPointRef.current = null;
        touchMovedRef.current = false;
      };
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        createMap(pos.coords.longitude, pos.coords.latitude);
      },
      () => {
        fallback();
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60_000,
      }
    );

    return () => {
      tempMarkerRef.current?.remove();
      tempMarkerRef.current = null;

      mapRef.current?.remove();
      mapRef.current = null;

      touchStartPointRef.current = null;
      touchMovedRef.current = false;
    };
  }, []);

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
      tempMarkerRef.current = new maplibregl.Marker({ anchor: "bottom" })
        .setLngLat(lngLat)
        .addTo(map);
    } else {
      tempMarkerRef.current.setLngLat(lngLat);
    }
  }, [tempPin]);

  return <div ref={containerRef} style={{ height: "100dvh", width: "100%" }} />;
}
