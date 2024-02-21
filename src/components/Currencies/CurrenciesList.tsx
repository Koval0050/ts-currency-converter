import { FC } from "react";
import { CURRENCIES } from "constants/currencies";
import { CurrenciesListItem } from "./CurrenciesListItem";
import { CurrenciesListStyle } from "./CurrenciesListStyle";
import { IProps } from "types/types";

export const CurrenciesList: FC<IProps<string>> = ({
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
