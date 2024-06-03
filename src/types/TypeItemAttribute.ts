export type Value = {
  id: number;
  value: string;
};

export type TypeItemAttribute = {
  id?: number;
  itemId: number;
  title: string;
  values: Value[];
};
