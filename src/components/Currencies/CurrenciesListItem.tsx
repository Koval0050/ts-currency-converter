type Props = {
  currency: string;
  onClick: (currency: string) => void;
  isActive: boolean;
};

export const CurrenciesListItem = ({ currency, onClick, isActive }: Props) => {
  const handleClick = () => {
    onClick(currency);
  };

  return (
    <li
      className={`CurrenciesListItem ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {currency}
    </li>
  );
};
