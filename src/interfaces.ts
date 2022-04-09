import React from "react";
export interface IHeaderContext {
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
}
