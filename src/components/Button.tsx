type TypeBtn = "button" | "submit" | "reset";
type StyleBtn = "primary" | "outline";

interface ButtonProps {
  type: TypeBtn;
  label: string;
  onPress: () => void;
  style?: StyleBtn;
  classes?: string;
}

function Button({ type, label, onPress, style, classes }: ButtonProps) {
  return (
    <button
      type={type}
      className={
        "w-full items-center justify-center transition-colors flex rounded font-bold cursor-pointer border-2 border-teddy-500" +
        (style === "primary"
          ? " bg-teddy-500 text-white hover:bg-teddy-600 hover:border-teddy-600"
          : style === "outline"
          ? " bg-transparent text-teddy-500 hover:bg-teddy-500 hover:text-white"
          : null) +
        (classes ? ` ${classes}` : "")
      }
      onClick={onPress}
    >
      {label}
    </button>
  );
}

export default Button;
