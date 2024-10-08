import { useEffect, useState } from 'react';
import {
  TypeCategory,
  TypeClient,
  TypeOperation,
  TypeOutput,
  TypeProduct,
  TypeProductionType,
  TypePurchase,
  TypeStock,
  TypeStoragePlace,
  TypeUnit,
} from '../types';
import {
  getAllCategory,
  getAllClient,
  getAllOperation,
  getAllOutput,
  getAllProduct,
  getAllProductionType,
  getAllProductOutput,
  getAllPurchase,
  getAllStock,
  getAllStoragePlace,
  getAllUnit,
} from '../api';

export const useFetchAllData = (deps: {
  depsStock?: boolean;
  depsPurchase?: boolean;
  depsProductBatch?: boolean;
  depsUnit?: boolean;
  depsOperation?: boolean;
  depsProductionType?: boolean;
  depsOutput?: boolean;
  depsProduct?: boolean;
  depsCategory?: boolean;
  depsClient?: boolean;
  depsEmployee?: boolean;
  depsMeterType?: boolean;
  depsMeter?: boolean;
  depsProductOutput?: boolean;
  depsStoragePlace?: boolean;
}) => {
  const [allStock, setAllStock] = useState<TypeStock[]>([]);
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>([]);
  const [allUnit, setAllUnit] = useState<TypeUnit[]>([]);
  const [allOperation, setAllOperation] = useState<TypeOperation[]>([]);
  const [allProductionType, setAllProductionType] = useState<
    TypeProductionType[]
  >([]);
  const [allOutput, setAllOutput] = useState<TypeOutput[]>([]);
  const [allProduct, setAllProduct] = useState<TypeProduct[]>([]);
  const [allCategory, setAllCategory] = useState<TypeCategory[]>([]);
  const [allClient, setAllClient] = useState<TypeClient[]>([]);
  const [allProductOutput, setAllProductOutput] = useState<TypeProduct[]>([]);
  const [allStoragePlace, setAllStoragePlace] = useState<TypeStoragePlace[]>(
    [],
  );

  useEffect(() => {
    if (deps.depsStock) {
      getAllStock()
        .then(data => setAllStock(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsStock]);

  useEffect(() => {
    if (deps.depsPurchase) {
      getAllPurchase()
        .then(data => setAllPurchase(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsPurchase]);

  useEffect(() => {
    if (deps.depsUnit) {
      getAllUnit()
        .then(data => setAllUnit(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsUnit]);

  useEffect(() => {
    if (deps.depsOperation) {
      getAllOperation()
        .then(data => setAllOperation(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsOperation]);

  useEffect(() => {
    if (deps.depsProductionType) {
      getAllProductionType()
        .then(data => setAllProductionType(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsProductionType]);

  useEffect(() => {
    if (deps.depsOutput) {
      getAllOutput()
        .then(data => setAllOutput(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsOutput]);

  useEffect(() => {
    if (deps.depsProduct) {
      getAllProduct()
        .then(data => setAllProduct(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsProduct]);

  useEffect(() => {
    if (deps.depsCategory) {
      getAllCategory()
        .then(data => setAllCategory(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsCategory]);

  useEffect(() => {
    if (deps.depsClient) {
      getAllClient()
        .then(data => setAllClient(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsClient]);

  useEffect(() => {
    if (deps.depsProductOutput) {
      getAllProductOutput()
        .then(data => setAllProductOutput(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsProductOutput]);

  useEffect(() => {
    if (deps.depsStoragePlace) {
      getAllStoragePlace()
        .then(data => setAllStoragePlace(data))
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [deps.depsStoragePlace]);

  return {
    allStock,
    allPurchase,
    allUnit,
    allOperation,
    allProductionType,
    allOutput,
    allProduct,
    allCategory,
    allClient,
    allProductOutput,
    allStoragePlace,
  };
};
