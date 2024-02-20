import "./MoneyAmountInput.scss";
import { ChangeEvent } from "react";

type Props = {
  value: number;
  onInput: (newValue: number) => void;
};

export const MoneyAmountInput = ({ value, onInput }: Props) => {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(target.value);
    if (newValue < 0) {
      onInput(0);
    }
    onInput(newValue);
  };
  return (
    <input
      className="MoneyAmountInput"
      type="number"
      value={value || 0}
      onChange={onChange}
      placeholder="0"
    />
  );
};
