import axios, { AxiosResponse } from "axios";
import { API_URL_EXCHANGE } from "constants/apiUrl";
import { ICurrency } from "types/types";

export const getCurrencies = async (): Promise<ICurrency[]> => {
  try {
    const { data }: AxiosResponse<ICurrency[]> = await axios.get(
      API_URL_EXCHANGE
    );
    return data;
  } catch (error) {
    throw error;
  }
};
