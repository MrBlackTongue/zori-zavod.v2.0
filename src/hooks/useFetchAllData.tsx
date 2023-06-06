import {useState, useEffect} from 'react';
import {
  TypeStock,
  TypePurchase,
  TypeProductBatch,
  TypeUnit,
  TypeOperation,
  TypeProductionType,
  TypeOutput,
  TypeProduct,
  TypeProductGroup,
  TypeClient,
  TypeEmployee,
  TypeMeterType,
  TypeMeter,
} from "../types";
import {
  getAllStock,
  getAllPurchase,
  getAllProductBatch,
  getAllUnit,
  getAllOperation,
  getAllProductionType,
  getAllOutput,
  getAllProduct,
  getAllProductGroup,
  getAllClient,
  getAllEmployee,
  getAllMeterType,
  getAllMeter,
} from "../services";

export const useFetchAllData = () => {
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
  const [allMeterType, setAllMeterType] = useState<TypeMeterType[]>([]);
  const [allMeter, setAllMeter] = useState<TypeMeter[]>([]);

  useEffect(() => {
    getAllStock().then((data) => {
      setAllStock(data);
    });
  }, []);

  useEffect(() => {
    getAllPurchase().then((data) => {
      setAllPurchase(data);
    });
  }, []);

  useEffect(() => {
    getAllProductBatch().then((data) => {
      setAllProductBatch(data);
    });
  }, []);

  useEffect(() => {
    getAllUnit().then((data) => {
      setAllUnit(data);
    });
  }, []);


  useEffect(() => {
    getAllOperation().then((data) => {
      setAllOperation(data);
    });
  }, []);

  useEffect(() => {
    getAllProductionType().then((data) => {
      setAllProductionType(data);
    });
  }, []);

  useEffect(() => {
    getAllOutput().then((data) => {
      setAllOutput(data);
    });
  }, []);

  useEffect(() => {
    getAllProduct().then((data) => {
      setAllProduct(data);
    });
  }, []);

  useEffect(() => {
    getAllProductGroup().then((data) => {
      setAllProductGroup(data);
    });
  }, []);

  useEffect(() => {
    getAllClient().then((data) => {
      setAllClient(data);
    });
  }, []);

  useEffect(() => {
    getAllEmployee().then((data) => {
      setAllEmployee(data);
    });
  }, []);

  useEffect(() => {
    getAllMeterType().then((data) => {
      setAllMeterType(data);
    });
  }, []);

  useEffect(() => {
    getAllMeter().then((data) => {
      setAllMeter(data);
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
    allMeterType,
    allMeter,
  };
}