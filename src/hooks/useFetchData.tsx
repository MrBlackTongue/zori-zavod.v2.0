import {useState, useEffect} from 'react';
import {TypeStock, TypePurchase, TypeProductBatch} from "../types";
import {getAllStock, getAllPurchase, getAllProductBatch} from "../services";

export const useFetchData = () => {
  const [allStock, setAllStock] = useState<TypeStock[]>([]);
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>([]);
  const [allProductBatch, setAllProductBatch] = useState<TypeProductBatch[]>([]);

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

  return {allStock, allPurchase, allProductBatch};
}