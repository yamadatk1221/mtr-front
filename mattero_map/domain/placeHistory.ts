export type placeHistory = {
  /** id */
  id: string;

  /** placeId */
  placeId: string;

  /** 訪問日 */
  visitedAt: string;

  /** メモ */
  memo?: string | null;

  /** コスト */
  cost?: number | null;

  /** 作成日時 */
  createdAt: string;

  /** 更新日時 */
  updatedAt: string;
};
