import React, { useState } from "react";
import classNames from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  placeholder: string;
  type?: "text" | "currency";
  value: string | number;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  validator?: string;
  height?: "small" | "medium" | "large";
  className?: string;
}

const Input = ({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  validator,
  height,
  className,
  ...rest
}: InputProps) => {
  const [error, setError] = useState("");

  const handleValidation = (currentValue: string | number | null) => {
    if (
      rest.required &&
      validator &&
      (currentValue === "" || currentValue === null)
    ) {
      setError(validator);
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleValidation(inputValue);

    onChange((prevForm: any) => ({
      ...prevForm,
      [e.target.id]: inputValue,
    }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    rawValue = rawValue.replace(/\D/g, "");

    let numericValue = Number(rawValue) / 100;

    if (isNaN(numericValue)) {
      numericValue = 0;
    }

    handleValidation(numericValue);

    onChange((prevForm: any) => ({
      ...prevForm,
      [e.target.id]: numericValue,
    }));
  };

  const getFormattedValue = () => {
    if (type === "currency" && value !== null && value !== undefined) {
      const numericValue =
        typeof value === "string" ? parseFloat(value) : value;

      if (isNaN(numericValue)) {
        return "";
      }

      return `R$ ${numericValue
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
    }
    return value;
  };

  const classes = classNames(
    "px-3 border-2 border-stone-200 rounded w-full h-10 outline-0 focus:border-teddy-500 placeholder:text-stone-400 transition-colors",
    {
      "h-10": height === "small",
      "h-12": height === "medium",
      "h-14": height === "large",
      invalid: !!error,
    },
    className
  );

  return (
    <div className="w-full flex flex-col gap-1 form-group">
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type === "currency" ? "text" : type}
        value={getFormattedValue()}
        onChange={type === "currency" ? handleCurrencyChange : handleChange}
        className={classes}
      />
      {error && (
        <span className="input-error text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;
