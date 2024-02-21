import { useEffect, useState, useCallback, FC } from "react";

import { getCurrencies } from "api";
import { CURRENCIES } from "constants/currencies";
import { ICurrency, VoidFunction, TInputAmount, TCurrency } from "types/types";

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
        const fetchedData = await getCurrencies();
        const filteredData = fetchedData.filter((currency: ICurrency) =>
          CURRENCIES.hasOwnProperty(currency.cc)
        );
        setCurrencies(filteredData);

        const usdCurrency = filteredData.find(
          (currency: ICurrency) => currency.cc === CURRENCIES.USD
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
  const handleFromCurrencyChange: VoidFunction<TCurrency> = useCallback(
    (currency: TCurrency) => {
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

  const handleToCurrencyChange: VoidFunction<TCurrency> = useCallback(
    (currency: TCurrency) => {
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
  const onChangeFromAmount: VoidFunction<TInputAmount> = useCallback(
    (newValue: TInputAmount) => {
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
  const onChangeToAmount: VoidFunction<TInputAmount> = useCallback(
    (newValue: TInputAmount) => {
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
