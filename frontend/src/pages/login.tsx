import { LoginForm } from "@src/components/loginForm";

export const LoginPage = () => {
  return (
    <>
      <LoginForm
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </>
  );
};
