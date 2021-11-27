import { TwColor } from "../utils/twIncludeAllColors";

export interface Note {
  _id: string;
  text: string;
  childrenIds: string[];
  isExpanded: boolean;
  needsFocus?: true;
  isPage?: boolean;
  baseColor?: TwColor;
}
