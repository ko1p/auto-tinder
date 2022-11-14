import { ButtonTinder } from 'shared/ui';
import React from 'react';
import { Result } from 'antd';

export const ChangeError = () => (
  <Result
    className="forgot-form"
    status="warning"
    title="Неизвестная ошибка"
    subTitle="При смене пароля произошла неизвестная ошибка! Пожалуйста сообщите нам"
    extra={[
      <a
        className="forgot-form__item"
        key="redirect"
        href="mailto:shaidarharan87@mail.com"
      >
        <ButtonTinder
          className="forgot-form__submit"
          theme="accept"
          type="primary"
        >
          Сообщить нам
        </ButtonTinder>
      </a>,
    ]}
  />
);
