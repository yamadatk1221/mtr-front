import { place } from "./place";
import { placeFile } from "./placeFile";
import { placeHistory } from "./placeHistory";

export type placeDetail = {
  /** place */
  place: place;
  /** placeHistories */
  placeHistories: placeHistory[];
  /** placeFiles */
  placeFiles: placeFile[];
};
