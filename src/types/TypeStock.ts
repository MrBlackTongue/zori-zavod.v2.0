import { TypeStoragePlace } from './TypeStoragePlace';
import { TypeItem } from './TypeItem';

export type TypeStock = {
  id?: number;
  item?: TypeItem;
  amount?: number;
  storagePlace?: TypeStoragePlace;
};
