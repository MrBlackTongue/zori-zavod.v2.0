export interface SubscriptionResponse {

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