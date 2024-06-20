//TODO: валидация для email
export const FieldValidation = {
  required: "Обязательно для заполнения",
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return "Русские символы недопустимы";
    }
    return true;
  },
};
export const BaseFieldValidation = {
  required: "Поле обязательно для заполнения",
  minLength: { value: 2, message: "Минимум 2 символа" },
  maxLength: { value: 30, message: "Максимум 30 символов" },
};

export const EmailValidation = {
  ...BaseFieldValidation,
  pattern: { value: /^\S+@\S+$/i, message: "Неверный формат email" },
};

export const PhoneValidation = {
  ...BaseFieldValidation,
  pattern: {
    value: /^\+?[1-9]\d{1,14}$/,
    message: "Неверный формат телефона",
  },
};

export const ConfirmPasswordValidation = (password: string) => ({
  required: "Поле обязательно для заполнения",
  validate: (value: string) => value === password || "Пароли не совпадают",
});
