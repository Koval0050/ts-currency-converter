import { useEffect, useState, useCallback, FC } from "react";

import { getCurrencies } from "api";
import { CURRENCIES } from "constants/currencies";
import { ICurrency, OnChangeAmount, OnChangeCurrency } from "types";

import { Container } from "components/Container";
import { CurrenciesList } from "components/Currencies/CurrenciesList";
import { MoneyAmountInput } from "components/MoneyAmountInput";

const App: FC = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>(CURRENCIES.UAH);
  const [toCurrency, setToCurrency] = useState<string>(CURRENCIES.USD);
  const [convertedAmountFrom, setConvertedAmountFrom] = useState<number>(1);
  const [convertedAmountTo, setConvertedAmountTo] = useState<number>(1);

  //отримуємо курси валют
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: ICurrency[] = await getCurrencies();
        const filteredData = fetchedData.filter((currency) =>
          CURRENCIES.hasOwnProperty(currency.cc)
        );

        setCurrencies(filteredData);

        const usdCurrency = filteredData.find(
          (currency) => currency.cc === CURRENCIES.USD
        );
        if (usdCurrency) {
          setConvertedAmountFrom(usdCurrency.rate);
        }
      } catch (error) {
        console.error("Помилка під час отримання даних:", error);
      }
    };
    fetchData();
  }, [currencies]);

  //отримуємо курс валюти яку обрали
  const getExchangeRate = useCallback(
    (currencyCode: string) => {
      const currency = currencies.find((item) => item.cc === currencyCode);
      return currency?.rate || 1;
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
  const handleFromCurrencyChange: OnChangeCurrency = useCallback(
    (currency: string) => {
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

  const handleToCurrencyChange: OnChangeCurrency = useCallback(
    (currency: string) => {
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
  const onChangeFromAmount: OnChangeAmount = useCallback(
    (newValue: number) => {
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
  const onChangeToAmount: OnChangeAmount = useCallback(
    (newValue: number) => {
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
          onInput={onChangeFromAmount}
        />
      </Container>
      <Container>
        <CurrenciesList
          onClick={handleToCurrencyChange}
          activeCurrency={toCurrency}
        />
        <MoneyAmountInput
          value={convertedAmountTo}
          onInput={onChangeToAmount}
        />
      </Container>
    </div>
  );
};

export default App;
