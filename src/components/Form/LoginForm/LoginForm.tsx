import { useMutation } from "@tanstack/react-query";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { queryClient } from "../../../api/queryClient";
import { loginUser } from "../../../api/User";
import './LoginForm.scss';
import './Custom-login.scss'

import { FC, FormEventHandler, useState } from "react";
import { Icon } from "@/models";


export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const loginMutation = useMutation(
  //   {
  //     mutationFn: () => loginUser(email, password),
  //     onSuccess() {
  //       queryClient.invalidateQueries({ queryKey: ["users", "me"] });
  //     },
  //   },
  //   queryClient,
  // );

     const loginMutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess(data) {
      if (data) {
        localStorage.setItem('token', 'true');
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      }
    },
  });

  
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    loginMutation.mutate();
  };

  return (

    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <FormField  className={loginMutation.isError ? "error-message__login" : ""}>
          <input
            className="custom__login"
            type="email"
            name="email"
            placeholder="Электронная почта"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <Icon
            className="custom__email-icon"
            name="email"
            width={22}
            height={18}
          />
        </FormField>

        <FormField  className={loginMutation.isError ? "error-message__login" : ""}>
          <input
            className="custom__login"
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <Icon
            className="custom__key-icon"
            name="key"
            width={22}
            height={18}
          />
        </FormField>

      </div>
            <Button type="submit" title="Войти" isLoading={loginMutation.isPending}>
        Войти
      </Button>
    
    </form>
  );
};
