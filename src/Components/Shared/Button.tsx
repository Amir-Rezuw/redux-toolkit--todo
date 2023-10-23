import { ReactNode } from "react";

interface IProps {
  type: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ type, children, onClick, className }: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
