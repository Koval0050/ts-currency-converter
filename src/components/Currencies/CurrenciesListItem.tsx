import { FC } from "react";
import { IProps } from "types/types";
import classNames from "classnames";

interface IListItemProp<T> extends Omit<IProps<T>, "activeCurrency"> {
  // Виключаємо поле activeCurrency з IProps
  currency: T;
  isActive: boolean;
}

export const CurrenciesListItem: FC<IListItemProp<string>> = ({
  currency,
  onClick,
  isActive,
}) => {
  const listItemClasses = classNames("CurrenciesListItem", {
    active: isActive,
  });

  const handleClick = () => onClick(currency);

  return (
    <li className={listItemClasses} onClick={handleClick}>
      {currency}
    </li>
  );
};
