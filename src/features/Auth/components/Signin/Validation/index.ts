import * as yup from 'yup';

export const formSchema = yup.object().shape({
  email: yup.string().email('Укажите почту в корректном формате').required('Это обязательное поле'),
  password: yup
    .string()
    .required('Это обязательное поле')
    .matches(
      /^[a-zA-Z0-9 !@#$%^&*(){}[\]]*$/gm,
      'Используйте только латинские буквы, цифры и символы !@#$%^&*',
    )
    .min(8, 'Пароль должен состоять хотя бы из 8 символов')
    .max(255, 'Пароль не должен быть длиннее 255 символов'),
});
