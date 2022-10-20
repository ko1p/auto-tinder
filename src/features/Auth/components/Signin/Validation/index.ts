import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

export const formSchema = yup.object().shape({
  email: yup.string().email('Укажите почту в корректном формате').required('Это обязательное поле'),
  password: yup
    .string()
    .required('Это обязательное поле')
    .min(8, 'Пароль должен состоять хотя бы из 8 символов'),
});

export const formOptions = { resolver: yupResolver(formSchema) };
