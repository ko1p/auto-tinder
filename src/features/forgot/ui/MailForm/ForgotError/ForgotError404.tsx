import '../MailForm.scss';

import { Result, Space } from 'antd';

import { ButtonTinder } from 'shared/ui';
import { Link } from 'react-router-dom';
import React from 'react';
import { routing } from 'shared/routing';

interface IProps {
  reset: () => void;
}

export const ForgotError404: React.FC<IProps> = ({ reset }) => (
  <Result
    className="forgot-form"
    status="warning"
    title="Неверная почта"
    subTitle="Указанная почта не существует в нашей системе. Для регистрации нажмите на кнопку"
    extra={[
      <Space key="404">
        <Link
          className="forgot-form__item"
          onClick={() => reset()}
          to={routing.forgot}
        >
          <ButtonTinder
            className="forgot-form__submit"
            theme="cancel"
            type="primary"
          >
            Назад
          </ButtonTinder>
        </Link>
        <Link className="forgot-form__item" to={routing.signUp}>
          <ButtonTinder
            className="forgot-form__submit"
            theme="accept"
            type="primary"
          >
            Регистрация
          </ButtonTinder>
        </Link>
      </Space>,
    ]}
  />
);
