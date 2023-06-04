import {useState, useEffect} from 'react';
import {
  TypeStock,
  TypePurchase,
  TypeProductBatch,
  TypeUnit,
  TypeOperation,
  TypeProductionType,
  TypeOutput, TypeProduct, TypeProductGroup, TypeClient, TypeEmployee
} from "../types";
import {
  getAllStock,
  getAllPurchase,
  getAllProductBatch,
  getAllUnit,
  getAllOperation,
  getAllProductionType, getAllOutput, getAllProduct, getAllProductGroup, getAllClient, getAllEmployee
} from "../services";

export const useFetchData = () => {
  const [allStock, setAllStock] = useState<TypeStock[]>([]);
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>([]);
  const [allProductBatch, setAllProductBatch] = useState<TypeProductBatch[]>([]);
  const [allUnit, setAllUnit] = useState<TypeUnit[]>([]);
  const [allOperation, setAllOperation] = useState<TypeOperation[]>([]);
  const [allProductionType, setAllProductionType] = useState<TypeProductionType[]>([]);
  const [allOutput, setAllOutput] = useState<TypeOutput[]>([]);
  const [allProduct, setAllProduct] = useState<TypeProduct[]>([]);
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>([]);
  const [allClient, setAllClient] = useState<TypeClient[]>([]);
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>([]);


  useEffect(() => {
    getAllStock().then((allStock) => {
      setAllStock(allStock);
    });
  }, []);

  useEffect(() => {
    getAllPurchase().then((allPurchase) => {
      setAllPurchase(allPurchase);
    });
  }, []);

  useEffect(() => {
    getAllProductBatch().then((allProductBatch) => {
      setAllProductBatch(allProductBatch);
    });
  }, []);

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);


  useEffect(() => {
    getAllOperation().then((allOperation) => {
      setAllOperation(allOperation);
    });
  }, []);

  useEffect(() => {
    getAllProductionType().then((allProductionType) => {
      setAllProductionType(allProductionType);
    });
  }, []);

  useEffect(() => {
    getAllOutput().then((allOutput) => {
      setAllOutput(allOutput);
    });
  }, []);

  useEffect(() => {
    getAllProduct().then((allProduct) => {
      setAllProduct(allProduct);
    });
  }, []);

  useEffect(() => {
    getAllProductGroup().then((allProductGroup) => {
      setAllProductGroup(allProductGroup);
    });
  }, []);

  useEffect(() => {
    getAllClient().then((allClient) => {
      setAllClient(allClient);
    });
  }, []);

  useEffect(() => {
    getAllEmployee().then((allEmployee) => {
      setAllEmployee(allEmployee);
    });
  }, []);

  return {
    allStock,
    allPurchase,
    allProductBatch,
    allUnit,
    allOperation,
    allProductionType,
    allOutput,
    allProduct,
    allProductGroup,
    allClient,
    allEmployee,
  };
}