import { FC } from "react";
import cn from "classnames";

import { ActiveCurrencyProps } from "types";

interface ICurrenciesListItem<T>
  extends Omit<ActiveCurrencyProps<T>, "activeCurrency"> {
  currency: T;
  isActive: boolean;
}

export const CurrenciesListItem: FC<ICurrenciesListItem<string>> = ({
  currency,
  onClick,
  isActive,
}) => {
  const handleClick = () => onClick(currency);

  return (
    <li
      className={cn("CurrenciesListItem", {
        active: isActive,
      })}
      onClick={handleClick}
    >
      {currency}
    </li>
  );
};
