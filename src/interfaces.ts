import React from "react";
// =================
// Types
// =================
export type FStringSetter = (name: string) => void;
export type Stock = {
  name: string;
  icon?: string;
  ticker?: string;
};

// =================
// Interfaces
// =================
export interface IHeaderContext {
  heading: string;
  setHeadingName: FStringSetter;
}
