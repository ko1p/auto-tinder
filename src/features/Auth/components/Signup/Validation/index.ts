import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Это обязательное поле')
    .matches(/^[a-zA-Zа-яёА-ЯЁ\s-]*$/gm, 'Используйте кириллицу, латиницу, знак тире или пробел')
    .min(2, 'Имя должно состоять хотя бы из 2х символов')
    .max(64, 'Имя должно состоять максимум из 64 символов'),
  email: yup.string().email('Укажите почту в корректном формате').required('Это обязательное поле'),
  password: yup
    .string()
    .required('Это обязательное поле')
    .min(8, 'Пароль должен состоять хотя бы из 8 символов'),
  confirmPwd: yup
    .string()
    .required('Это обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const formOptions = { resolver: yupResolver(formSchema), shouldUseNativeValidation: false };
