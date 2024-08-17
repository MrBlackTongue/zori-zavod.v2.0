export type TypeItemAttributeValue = {
  id?: number;
  attributeId?: number;
  value: string;
};

export type TypeItemAttribute = {
  id?: number;
  itemId: number;
  title: string;
  values: TypeItemAttributeValue[];
};
