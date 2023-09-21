export type TypeSubscription = {
  "id": number,
  "customer": {
    "id": number,
    "title": string,
    "mainEmailId": number,
    "balance": number
  },
  "plan": {
    "id": number,
    "title": string,
    "price": number,
    "durationDays": number
  },
  "startDate": string,
  "endDate": string,
}