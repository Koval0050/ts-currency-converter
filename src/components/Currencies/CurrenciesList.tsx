import { CURRENCIES } from "constants/currencies";
import { CurrenciesListItem } from "./CurrenciesListItem";
import { CurrenciesListStyle } from "./CurrenciesListStyle";

type Props = {
  onClick: (currency: string) => void;
  activeCurrency: string;
};

export const CurrenciesList = ({ onClick, activeCurrency }: Props) => (
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
