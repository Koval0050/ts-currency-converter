export type ICurrency = {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string;
};

export type VoidFunction<T> = (value: T) => void;

export type TInputAmount = number;
export type TCurrency = string

export interface IProps<T> {
  activeCurrency: T;
  onClick: VoidFunction<T>;
}
