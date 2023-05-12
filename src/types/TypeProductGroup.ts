import React from "react";

export type TypeProductGroup = {
  id?: number;
  title?: string;
  parent?: TypeProductGroup;
  children?: TypeProductGroup[];
  parentGroup?: number;
};

export interface TypeProductGroupTree {
  key?: React.ReactNode;
  id?: number;
  title?: string;
  parent?: TypeProductGroupTree;
  children?: TypeProductGroupTree[];
  parentGroup?: number;
}