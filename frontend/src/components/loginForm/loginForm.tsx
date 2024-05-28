import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FieldValidation } from "../validation/FieldValidation";
import { ButtonNavigateToSignup } from "../ButtonNavigateToSignup";

//TODO Вынести типы в файл
export interface LoginFormProps {
  onSubmit: LoginFormOnSubmit;
}

export type LoginFormOnSubmit = (data: LoginFormFields) => void;

export type LoginFormFields = {
  login: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
  const { onSubmit } = props;

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

  const onSubmitForm = handleSubmit(async (data, e) => {
    console.log(data);

    onSubmit(data);
  });

  return (
    <div>
      <form onSubmit={onSubmitForm}>
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
