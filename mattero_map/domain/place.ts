export type place = {
  /** id */
  id: string;

  /** 表示名(店名など) */
  name: string;

  /** 緯度 */
  latitude: number;

  /** 経度 */
  longitude: number;

  /** 訪問日 */
  visitedAt: string;

  /** メモ */
  memo?: string;

  /** カテゴリ */
  categoryId?: string;

  /** カテゴリ名 */
  categoryName?: string;

  /** 公開範囲 */
  isPublic: boolean;

  /**作成日時 */
  createdAt: Date;

  /**更新日時 */
  updatedAt: Date;
};
