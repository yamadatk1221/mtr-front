export type place = {
  /** id */
  id: string;

  /** 表示名(店名など) */
  name: string;

  /** 経度 */
  lng: number;

  /** 緯度 */
  lat: number;

  /** 訪問日 */
  visitedAt: string;

  /** メモ */
  memo?: string | null;

  /** カテゴリ名 */
  categoryName?: string;

  /** 公開範囲 */
  isPublic: boolean;

  /** 評価 */
  value: number;

  /**作成日時 */
  createdAt: string;

  /**更新日時 */
  updatedAt: string;
};
