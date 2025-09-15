import classNames from "classnames";

type TypeBtn = "button" | "submit" | "reset";
type VariantBtn = "primary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: TypeBtn;
  label: string;
  onPress: () => void;
  variant?: VariantBtn;
  classes?: string;
}

function Button({
  type,
  label,
  onPress,
  variant,
  classes,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "w-full items-center justify-center transition-colors flex rounded font-bold cursor-pointer border-2 disabled:pointer-events-none disabled:opacity-60";

  const variantClasses = {
    "border-teddy-500 bg-teddy-500 text-white hover:bg-teddy-600 hover:border-teddy-600":
      variant === "primary",
    "border-teddy-500 bg-transparent text-teddy-500 hover:bg-teddy-500 hover:text-white":
      variant === "outline",
  };

  return (
    <button
      type={type}
      className={classNames(baseClasses, variantClasses, classes)}
      onClick={onPress}
      {...rest}
    >
      {label}
    </button>
  );
}

export default Button;
