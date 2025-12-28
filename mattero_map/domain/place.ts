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
  visitedAt: Date;

  /** メモ */
  memo?: string;

  /** カテゴリ名 */
  categoryName?: string;

  /** 公開範囲 */
  isPublic: boolean;

  /**作成日時 */
  createdAt: Date;

  /**更新日時 */
  updatedAt: Date;
};
