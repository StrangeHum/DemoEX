/* eslint-disable */
import LoginForm from ".";

export default {
  title: "LoginForm",
};

export const Default = () => (
  <LoginForm onSubmit={(data) => console.log(data)} />
);

Default.story = {
  name: "default",
};
