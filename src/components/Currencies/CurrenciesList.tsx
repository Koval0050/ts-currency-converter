import { FC } from "react";

import { CURRENCIES } from "constants/currencies";
import { ActiveCurrencyProps } from "types";

import { CurrenciesListItem } from "./CurrenciesListItem";
import { CurrenciesListStyle } from "./CurrenciesListStyle";

export const CurrenciesList: FC<ActiveCurrencyProps<string>> = ({
  onClick,
  activeCurrency,
}) => (
  <CurrenciesListStyle>
    {Object.values(CURRENCIES).map((currency) => (
      <CurrenciesListItem
        key={currency}
        currency={currency}
        isActive={currency === activeCurrency}
        onClick={onClick}
      />
    ))}
  </CurrenciesListStyle>
);
