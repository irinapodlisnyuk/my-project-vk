import { Button } from "../Button";

interface SuccessFormProps {
  onLoginClick: () => void;
}
export const SuccessForm = ({ onLoginClick }: SuccessFormProps) => {
  return (
    <div className="success-form">
      <p className="success-form__title">Регистрация завершена</p>
      <span className="success-form__text">
        Используйте вашу электронную почту для входа
      </span>

      <Button type="submit" title="Войти" onClick={onLoginClick}>
        Войти
      </Button>
    </div>
  );
};
