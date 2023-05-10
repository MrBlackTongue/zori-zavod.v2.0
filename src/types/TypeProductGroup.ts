export type TypeProductGroup = {
  id?: number;
  title?: string;
  parent?: TypeProductGroup;
  children?: TypeProductGroup[];
  parentGroup?: number;
};