import { FC, ReactNode } from "react";

interface IFormFieldProps {
  children: ReactNode;
  errorMessage?: string;
  className?: string; 
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  errorMessage,
  className = "", 
}) => {
  return (

    <label className={`form-field ${className}`}> 
      <div className="form-field__control">{children}</div>
      {errorMessage && (
        <span className="form-field__error-text">{errorMessage}</span>
      )}
    </label>
  );
};
