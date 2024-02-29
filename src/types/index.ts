export type ICurrency = {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string;
};


export type OnChangeAmount = (value: number) => void;
export type OnChangeCurrency = (value: string) => void;

export interface ActiveCurrencyProps<T> {
  activeCurrency: T;
  onClick: OnChangeCurrency;
}
