export type TypeAccount = {
  id?: number;
  customer?: TypeCustomer;
  plan?: TypePlan;
  // startDate?: ;
  // endDate?: ;
}

export type TypeCustomer = {
  id?: number;
  title?: string;
  mainEmailId?: number;
  balance?: number;
}

export type TypePlan = {
  id?: number;
  title?: string;
  price?: number;
  durationDays?: number;
}