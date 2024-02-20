import React, { useEffect, useState, useCallback } from "react";
import "./App.scss";

import { getCurrencies } from "api";
import { CURRENCIES } from "constants/currencies";
import { ApiResponse } from "./types";

import { Container } from "components/Container";
import { CurrenciesList } from "components/Currencies/CurrenciesList";
import { MoneyAmountInput } from "components/MoneyAmountInput";

function App() {
  const [currencies, setCurrencies] = useState<ApiResponse[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>(CURRENCIES.UAH);
  const [toCurrency, setToCurrency] = useState<string>(CURRENCIES.USD);
  const [convertedAmountFrom, setConvertedAmountFrom] = useState<number>(1);
  const [convertedAmountTo, setConvertedAmountTo] = useState<number>(1);

  //отримуємо курси валют
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getCurrencies();
        const filteredData = fetchedData.filter((currency: ApiResponse) =>
          CURRENCIES.hasOwnProperty(currency.cc)
        );
        setCurrencies(filteredData);
      } catch (error) {
        console.error("Помилка під час отримання даних:", error);
      }
    };
    fetchData();
  }, []);

  //встановлюємо значення курсу долара за замовчуванням
  useEffect(() => {
    const usdCurrency = currencies.find(
      (currency) => currency.cc === CURRENCIES.USD
    );
    if (usdCurrency) {
      setConvertedAmountFrom(usdCurrency.rate);
    }
  }, [currencies]);

  //отримуємо курс валюти яку обрали
  const getExchangeRate = useCallback(
    (currencyCode: string) => {
      const currency = currencies.find((item) => item.cc === currencyCode);
      return currency ? currency.rate : 1;
    },
    [currencies]
  );

  //функція конвертації
  const calculateConvertedAmount = useCallback(
    (amount: number, fromCurrency: string, toCurrency: string): number => {
      const fromRate = getExchangeRate(fromCurrency);
      const toRate = getExchangeRate(toCurrency);
      let result: number;

      if (fromCurrency === CURRENCIES.UAH) {
        result = amount / toRate;
      } else {
        result = (amount * fromRate) / toRate;
      }

      // Обрізаємо до 4 десяткових знаків
      result = parseFloat(result.toFixed(4));

      // Перевіряємо, чи результат є цілим числом
      if (Number.isInteger(result)) {
        result = parseInt(result.toFixed(0), 10); // Парсимо до цілого числа
      }

      return result;
    },
    [getExchangeRate]
  );

  //Функції зміни валюти
  const handleFromCurrencyChange = useCallback(
    (currency: string): void => {
      const amount = calculateConvertedAmount(
        convertedAmountFrom,
        currency,
        toCurrency
      );

      setFromCurrency(currency);
      setConvertedAmountTo(amount);
    },
    [calculateConvertedAmount, convertedAmountFrom, toCurrency]
  );

  const handleToCurrencyChange = useCallback(
    (currency: string): void => {
      const amount = calculateConvertedAmount(
        convertedAmountFrom,
        fromCurrency,
        currency
      );

      setToCurrency(currency);
      setConvertedAmountTo(amount);
    },
    [calculateConvertedAmount, convertedAmountFrom, fromCurrency]
  );

  //функції зміни суми у полях вводу
  const handleAmountInputChangeFrom = useCallback(
    (newValue: number): void => {
      const amount = calculateConvertedAmount(
        newValue,
        fromCurrency,
        toCurrency
      );

      setConvertedAmountFrom(newValue);
      setConvertedAmountTo(amount);
    },
    [calculateConvertedAmount, fromCurrency, toCurrency]
  );

  const handleAmountInputChangeTo = useCallback(
    (newValue: number): void => {
      const amount = calculateConvertedAmount(
        newValue,
        toCurrency,
        fromCurrency
      );

      setConvertedAmountTo(newValue);
      setConvertedAmountFrom(amount);
    },
    [calculateConvertedAmount, fromCurrency, toCurrency]
  );

  return (
    <div className="App">
      <Container>
        <CurrenciesList
          onClick={handleFromCurrencyChange}
          activeCurrency={fromCurrency}
        />
        <MoneyAmountInput
          value={convertedAmountFrom}
          onInput={handleAmountInputChangeFrom}
        />
      </Container>
      <Container>
        <CurrenciesList
          onClick={handleToCurrencyChange}
          activeCurrency={toCurrency}
        />
        <MoneyAmountInput
          value={convertedAmountTo}
          onInput={handleAmountInputChangeTo}
        />
      </Container>{" "}
    </div>
  );
}

export default App;
