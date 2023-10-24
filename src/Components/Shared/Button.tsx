import { ReactNode } from "react";

interface IProps {
  type: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type,
  children,
  onClick,
  className,
  disabled = false,
}: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
