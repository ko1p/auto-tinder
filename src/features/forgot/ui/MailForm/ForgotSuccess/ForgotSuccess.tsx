import '../MailForm.scss';

import { ButtonTinder } from 'shared/ui';
import { Link } from 'react-router-dom';
import React from 'react';
import { Result } from 'antd';
import { routing } from 'shared/routing';

export const ForgotSuccess = () => (
  <Result
    className="forgot-form"
    status="success"
    title="Запрос успешен"
    subTitle="Вам на почту отправлена ссылка для смены пароля"
    extra={[
      <Link className="forgot-form__item" key="redirect" to={routing.signIn}>
        <ButtonTinder
          className="forgot-form__submit"
          theme="accept"
          type="primary"
        >
          Вход
        </ButtonTinder>
      </Link>,
    ]}
  />
);
