export interface Note {
  _id: string;
  text: string;
  childrenIds: string[];
  needsFocus?: true;
}
