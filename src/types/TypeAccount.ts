export interface SubscriptionResponse {
  id: number,
  customer: {
    id: number,
    title: string,
    mainEmailId: number,
    balance: number
  },
  plan: {
    id: number,
    title: string,
    price: number,
    durationDays: number
  },
  "startDate": string,
  "endDate": string
}

export type Payment = {
  sum?: number;
}

export interface PaymentResponse {
  id?: string;
  status?: string;
  confirmation?: {
    type?: string;
    return_url?: string;
    confirmation_url?: string;
  }
}