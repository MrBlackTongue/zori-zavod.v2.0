import React from "react";

export type TypeProductGroup = {
  key?: React.ReactNode;
  id?: number;
  title?: string;
  parent?: TypeProductGroup;
  children?: TypeProductGroup[];
  parentGroup?: number;
}