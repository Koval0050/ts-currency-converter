export type ApiResponse = {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string;
};

export type ConvertAmount ={
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}
