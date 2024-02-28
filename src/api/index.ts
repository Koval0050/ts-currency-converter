import axios from "axios";
import { API_URL_EXCHANGE } from "constants/apiUrl";
import { ICurrency } from "types";

export const getCurrencies = async (): Promise<ICurrency[]> => {
  try {
    const { data } = await axios.get<ICurrency[]>(API_URL_EXCHANGE);
    return data;
  } catch (error) {
    throw error;
  }
};
