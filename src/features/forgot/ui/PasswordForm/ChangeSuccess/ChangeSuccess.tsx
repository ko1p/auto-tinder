import { ButtonTinder } from 'shared/ui';
import { Link } from 'react-router-dom';
import React from 'react';
import { Result } from 'antd';
import { routing } from 'shared/routing';

export const ChangeSuccess = () => (
  <Result
    className="forgot-form"
    status="success"
    title="Успешная смена пароля"
    subTitle="Вы сменили пароль, пожалуйста запомните его или запишите"
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
