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

export const useFetchAllData = (
  deps: {
    depsStock?: boolean,
    depsPurchase?: boolean,
    depsProductBatch?: boolean,
    depsUnit?: boolean,
    depsOperation?: boolean,
    depsProductionType?: boolean,
    depsOutput?: boolean,
    depsProduct?: boolean,
    depsProductGroup?: boolean,
    depsClient?: boolean,
    depsEmployee?: boolean,
    depsMeterType?: boolean,
    depsMeter?: boolean,
  }
) => {
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
    if (deps.depsStock) {
      getAllStock().then((data) => {
        setAllStock(data);
      });
    }
  }, [deps.depsStock]);

  useEffect(() => {
    if (deps.depsPurchase) {
      getAllPurchase().then((data) => {
        setAllPurchase(data);
      });
    }
  }, [deps.depsPurchase]);

  useEffect(() => {
    if (deps.depsProductBatch) {
      getAllProductBatch().then((data) => {
        setAllProductBatch(data);
      });
    }
  }, [deps.depsProductBatch]);

  useEffect(() => {
    if (deps.depsUnit) {
      getAllUnit().then((data) => {
        setAllUnit(data);
      });
    }
  }, [deps.depsUnit]);

  useEffect(() => {
    if (deps.depsOperation) {
      getAllOperation().then((data) => {
        setAllOperation(data);
      });
    }
  }, [deps.depsOperation]);

  useEffect(() => {
    if (deps.depsProductionType) {
      getAllProductionType().then((data) => {
        setAllProductionType(data);
      });
    }
  }, [deps.depsProductionType]);

  useEffect(() => {
    if (deps.depsOutput) {
      getAllOutput().then((data) => {
        setAllOutput(data);
      });
    }
  }, [deps.depsOutput]);

  useEffect(() => {
    if (deps.depsProduct) {
      getAllProduct().then((data) => {
        setAllProduct(data);
      });
    }
  }, [deps.depsProduct]);

  useEffect(() => {
    if (deps.depsProductGroup) {
      getAllProductGroup().then((data) => {
        setAllProductGroup(data);
      });
    }
  }, [deps.depsProductGroup]);

  useEffect(() => {
    if (deps.depsClient) {
      getAllClient().then((data) => {
        setAllClient(data);
      });
    }
  }, [deps.depsClient]);

  useEffect(() => {
    if (deps.depsEmployee) {
      getAllEmployee().then((data) => {
        setAllEmployee(data);
      });
    }
  }, [deps.depsEmployee]);

  useEffect(() => {
    if (deps.depsMeterType) {
      getAllMeterType().then((data) => {
        setAllMeterType(data);
      });
    }
  }, [deps.depsMeterType]);

  useEffect(() => {
    if (deps.depsMeter) {
      getAllMeter().then((data) => {
        setAllMeter(data);
      });
    }
  }, [deps.depsMeter]);

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