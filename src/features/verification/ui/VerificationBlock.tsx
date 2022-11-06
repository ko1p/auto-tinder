import './VerificationBlock.scss';

import { Alert } from 'antd';
import { ButtonTinder } from 'shared/ui';
import { Link } from 'react-router-dom';
import React from 'react';
import { routing } from 'shared/routing';
import { useParams } from 'react-router';
import { verificationAPI } from '../model';

export const VerificationBlock = () => {
  const params = useParams();
  const { isLoading, isSuccess, isError, error } =
    verificationAPI.useVerificationQuery(params.verificationToken!);
  return (
    <>
      {isLoading && 'Загрузка...'}
      {isSuccess && (
        <Alert
          className="warning"
          message="Поздравляем!"
          description="Ваш аккаунт успешно активирован"
          type="success"
          showIcon
          action={
            <Link className="warning__button" to={routing.signIn}>
              <ButtonTinder theme="accept" type="primary">
                Войти
              </ButtonTinder>
            </Link>
          }
        />
      )}
      {isError && error.status === 404 ? (
        <Alert
          className="warning"
          message="Произошла ошибка!"
          showIcon
          description="Запрашиваемая страница активации не найдена. Возможно ваш аккаунт активирован. Если это не так напишите нам!"
          type="error"
          action={
            <div className="warning__buttons">
              <Link className="warning__button" to={routing.signIn}>
                <ButtonTinder theme="accept" type="primary">
                  Войти
                </ButtonTinder>
              </Link>
              <span className="warning__button">
                <ButtonTinder theme="accent" type="primary">
                  Написать нам!
                </ButtonTinder>
              </span>
            </div>
          }
        />
      ) : (
        <Alert
          className="warning"
          message="Произошла ошибка!"
          showIcon
          description="Срок действия активационной ссылки истёк. Зарегистрируйтесь повторно или свяжитесь с нами, если причина ошибки в другом"
          type="error"
          action={
            <div className="warning__buttons">
              <Link className="warning__button" to={routing.signUp}>
                <ButtonTinder theme="accept" type="primary">
                  Зарегистрироваться
                </ButtonTinder>
              </Link>
              <span className="warning__button">
                <ButtonTinder theme="cancel" type="primary">
                  Написать нам!
                </ButtonTinder>
              </span>
            </div>
          }
        />
      )}
    </>
  );
};
