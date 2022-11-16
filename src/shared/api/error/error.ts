import { IError } from 'shared/lib/types';
import { message } from 'antd';

export const ApiError = ({ status, data }: IError) => {
  const Error400 = () => {
    switch (data.Reason) {
      case 'Bad request':
        message.error('Неправильный запрос');
        break;

      default:
        message.error(`Неизвестная ошибка запроса: ${data.Reason}`);
        break;
    }
  };
  const Error401 = () => {
    switch (data.Reason) {
      case 'Bad credentials':
        message.error('Неправильный логин или пароль');
        break;
      case 'User account is locked':
        message.error('Активируйте аккаут через почту');
        break;

      default:
        message.error(`Неизвестная ошибка авторизации: ${data.Reason}`);
        break;
    }
  };
  const Error403 = () => {
    switch (data.Reason) {
      case 'Forbidden':
        message.error('Ошибка доступа');
        break;

      default:
        message.error(`Неизвестная ошибка доступа: ${data.Reason}`);
        break;
    }
  };
  const Error404 = () => {
    switch (data.Reason) {
      case 'Not Found':
        message.error('Страница не найдена');
        break;

      default:
        message.error(`Страница не найдена: ${data.Reason}`);
        break;
    }
  };
  switch (status) {
    case 400:
      Error400();
      break;
    case 401:
      Error401();
      break;
    case 403:
      Error403();
      break;
    case 404:
      Error404();
      break;
    default:
      break;
  }
};
