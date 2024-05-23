import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FieldValidation } from "../validation/FieldValidation";
import { useTryAuthMutation } from "@src/redux/api/auth.api";

import { ButtonNavigateToSignup } from "../ButtonNavigateToSignup";
import { useActions } from "../hooks/useActions";

//TODO Вынести типы в файл
export interface LoginFormProps {
  onSubmit: (data: LoginFormFields) => void;
}

export type LoginFormFields = {
  //FIXME AuthData & {значения...}
  login: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
  const [loginUser, { data, isSuccess, isLoading, isError }] =
    useTryAuthMutation();

  const { setUser } = useActions();

  const methods = useForm<LoginFormFields>({
    defaultValues: {
      login: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = methods;

  const onSubmit = handleSubmit(async (data, e) => {
    console.log(data);
    loginUser({
      login: data.login,
      password: data.password,
      // rememberMe: data.rememberMe, //TODO: Remember
    });
  });

  useEffect(() => {
    //TODO: Сорханение в local store
    if (isSuccess) {
      console.log(data);
      if (!data) {
        console.error("dataAuth");
      }

      setUser(data.user);
    }
  }, [isSuccess]);

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Load...</div>;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* TODO: Валидация логина */}
        <Stack>
          <Controller
            rules={FieldValidation}
            control={control}
            name="login"
            render={({ field }) => (
              <TextField
                {...field}
                label="логин"
                type="text"
                // onBlur={onBlur}
                // onChange={onChange}
                error={!!errors.login?.message}
                helperText={errors.login?.message}
              />
            )}
          />

          <Controller
            rules={FieldValidation}
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                label="пароль"
                type="text"
                // onBlur={onBlur}
                // onChange={onChange}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />
          <FormControlLabel
            label="Запомнить меня"
            control={
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { value, onBlur, onChange } }) => (
                  <Checkbox checked={value} onChange={onChange} />
                )}
              />
            }
          ></FormControlLabel>

          <Button
            type="submit"
            disabled={!isValid}
            fullWidth={true}
            variant="contained"
          >
            Войти
          </Button>

          <ButtonNavigateToSignup />
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
