import { FormField } from "../FormField";
import { Button } from "../Button";
import { queryClient } from "../../../api/queryClient";
import { FC } from "react";
import { registerUser } from "../../../api/User";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Icon } from "@/models";
import './RegisterForm.scss';
import './Custom__register.scss';

interface RegisterFormProps {
  onSuccess: () => void;
}

const CreateRegisterSchema = z
  .object({
    name: z.string().min(3, "Введите не менее 3 символов"),
    surname: z.string().min(3, "Введите не менее 3 символов"),
    email: z
      .string()
      .min(1, "Введите Email")
      .min(4, "Email должен буть не менее 4 символов") // Проверка на пустоту
      .email("Некорректный формат Email"),

    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string(), 
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], 
  });

type CreateRegisterForm = z.infer<typeof CreateRegisterSchema>;

export const RegisterForm: FC<RegisterFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRegisterForm>({
    resolver: zodResolver(CreateRegisterSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: (data: CreateRegisterForm) =>
        registerUser(data.email, data.name, data.surname, data.password),
      onSuccess() {
        reset(); 
        onSuccess(); 
      },
    },
    queryClient,
  );

  return (
    <>
      <p className="register-form__title">Регистрация</p>
      <form
        className="register-form"
        onSubmit={handleSubmit((data: CreateRegisterForm) =>
          registerMutation.mutate(data),
        )}
      >
        <FormField
          className={
            errors.email || registerMutation.isError
              ? "error-message__register"
              : ""
          }
          errorMessage={errors.email?.message}
        >
          <input
            type="email"
            className="custom__register"
            placeholder="Электронная почта"
            {...register("email")}
          />
          <Icon
            className="custom__email-icon"
            name="email"
            width={22}
            height={18}
          />
        </FormField>
        <FormField
          className={
            errors.name || registerMutation.isError
              ? "error-message__register"
              : ""
          }
          errorMessage={errors.name?.message}
        >
          <input
            type="text"
            className="custom__register"
            placeholder="Имя"
            {...register("name")}
          />
          <Icon
            className="custom__name-icon"
            name="human"
            width={16}
            height={21}
          />
        </FormField>
        <FormField
          className={
            errors.surname || registerMutation.isError
              ? "error-message__register"
              : ""
          }
          errorMessage={errors.surname?.message}
        >
          <input
            type="text"
            className="custom__register"
            placeholder="Фамилия"
            {...register("surname")}
          />
          <Icon
            className="custom__name-icon"
            name="human"
            width={16}
            height={21}
          />
        </FormField>

        <FormField
          className={
            errors.password || registerMutation.isError
              ? "error-message__register"
              : ""
          }
          errorMessage={errors.password?.message}
        >
          <input
            type="password"
            placeholder="Пароль"
            className="custom__register"
            {...register("password")}
          />
          <Icon
            className="custom__key-icon"
            name="key"
            width={22}
            height={18}
          />
        </FormField>
        <FormField
          className={
            errors.confirmPassword || registerMutation.isError
              ? "error-message__register"
              : ""
          }
          errorMessage={errors.confirmPassword?.message}
        >
          <input
            className="custom__register"
            type="password"
            placeholder="Подтвердите пароль"
            {...register("confirmPassword")}
          />
          <Icon
            className="custom__key-icon"
            name="key"
            width={22}
            height={18}
          />
        </FormField>
        <Button type="submit" isLoading={registerMutation.isPending}>
          Создать аккаунт
        </Button>
      </form>
    </>
  );
};
