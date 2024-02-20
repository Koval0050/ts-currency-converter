import axios from "axios";
import { API_URL_EXCHANGE } from "constants/apiUrl";

export const getCurrencies = async () => {
  try {
    const data = await axios.get(API_URL_EXCHANGE);
    return data.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    throw error;
  }
};
