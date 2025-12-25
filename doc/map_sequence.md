# page(Home) と MapView の処理フロー（時系列）

## 登場人物

- User : 画面を操作する人
- Home(page) : state を持つ親コンポーネント
- MapView : 地図表示・イベント検知担当
- MapLibre : 地図ライブラリ（緯度経度を計算する）

---

## ① 初期表示（ページを開いた直後）

User
|
| ページを開く
v
Home(page)
|
|-- useState(null)
| lastTap = null
|
|-- JSX を返す
| - PlaceCard を表示
| - MapView(onMapTap = (p) => setLastTap(p))
| - lastTap が null → 下パネルは表示しない
v
MapView
|
|-- <div ref={containerRef}> が DOM に描画される
|-- useEffect が予約される

---

## ② MapView 初期化（描画後）

MapView
|
|-- useEffect 実行
|-- containerRef が存在 && mapRef が null
|
|-- new MapLibre.Map(...)
|-- 地図コントロール追加
|-- click イベント登録
|
|-- map.on("click", handler)
| handler(e):
| onMapTap?.({
| lat: e.lngLat.lat,
| lng: e.lngLat.lng
| })
|
|-- mapRef.current = map

---

## ③ ユーザーが地図をタップ

User
|
| 地図をタップ
v
MapLibre
|
|-- クリック位置(px)を検知
|-- 地図情報から緯度・経度を計算
|
|-- e.lngLat = { lat, lng }
v
MapView
|
|-- click handler 実行
|-- onMapTap({ lat, lng }) を呼ぶ
|
| ※ onMapTap の正体
| = (p) => setLastTap(p)
v
Home(page)
|
|-- setLastTap({ lat, lng })
|-- state 更新
| lastTap = { lat, lng }

---

## ④ state 更新 → 再レンダリング

Home(page)
|
|-- Home() が再実行される
|
|-- JSX を再計算
| - MapView はそのまま
| - lastTap が truthy
| → 下パネルを表示
|
v
User
|
| 画面下に
| 「Tap: lat / lng」パネルが表示される

---

## ⑤ ポイントまとめ

- MapLibre
  - 緯度・経度を「計算するだけ」
- MapView
  - 地図表示
  - イベント検知
  - 親に事実を通知
- Home(page)
  - state を持つ
  - state に応じて UI を切り替える

---

## 一言まとめ

「User の操作」
→ MapLibre が座標計算
→ MapView がイベント通知
→ Home が state 更新
→ Home が UI を再計算
