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
