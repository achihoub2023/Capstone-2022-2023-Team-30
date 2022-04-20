import React from "react";
export type FStringSetter = (name: string) => void;
export interface IHeaderContext {
  heading: string;
  setHeadingName: FStringSetter;
}
