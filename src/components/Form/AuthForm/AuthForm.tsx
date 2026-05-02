import { useState } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import { Icon } from "@/models";
import { SuccessForm } from "../SuccessForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleTheme } from "@/store/themeSlice";
import { Switch } from "antd";
import './AuthForm.scss';
import './Auth-form__theme-btn.scss';

interface AuthFormProps {
  onClose: () => void;
}

export const AuthForm = ({ onClose }: AuthFormProps) => {
  const [authType, setAuthType] = useState<string>("auth");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register",
    );
  };

  const handleSwitch = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`auth-form auth-form--${theme}`}>
      <Switch
        className="auth-form__theme-btn"
        checked={theme === "white"}
        onChange={handleSwitch}
      />

      <div className="auth-form__logo">
        <Icon
          name="mask-dekstop"
          className="auth-form__marusya-icon"
          width={27}
          height={35}
        />
        <Icon
          className="auth-form__marusya-text"
          name="marusya"
          width={109}
          height={23}
        />
      </div>

      {isSuccess ? (
        <SuccessForm
          onLoginClick={() => {
            setIsSuccess(false);
            setAuthType("auth");
          }}
        />
      ) : (
        <>
          {authType === "register" ? (
            <RegisterForm onSuccess={() => setIsSuccess(true)} />
          ) : (
            <LoginForm />
          )}

          <div className="auth-form__info">
            <button className="auth-form__button" onClick={handleClick}>
              {authType === "register" ? "У меня есть пароль" : "Регистрация"}
            </button>
          </div>
        </>
      )}
      <button className="auth-form__button-close" onClick={onClose}>
        <Icon
          className="auth-form__close"
          name="close-icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};
