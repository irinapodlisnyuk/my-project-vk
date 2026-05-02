import { FC, HTMLAttributes } from "react";
import { LoaderForm } from "../LoaderForm";
import './Form__btn.scss';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
}

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  kind = "primary",
  type,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className="form__btn"
      data-kind={kind}
      {...props}
    >
      {isLoading ? <LoaderForm /> : children}
    </button>
  );
};
