import { ButtonTinder } from 'shared/ui';
import { Link } from 'react-router-dom';
import React from 'react';
import { Result } from 'antd';
import { routing } from 'shared/routing';

export const ChangeError404 = () => (
  <Result
    className="forgot-form"
    status="warning"
    title="Ссылка устарела"
    subTitle="Ссылка на смену пароля устарела, это связано с безопасностью ваших данных, пожалуйста отправьте запрос повторно"
    extra={[
      <Link key="404" className="forgot-form__item" to={routing.forgot}>
        <ButtonTinder
          className="forgot-form__submit"
          theme="cancel"
          type="primary"
        >
          Смена пароля
        </ButtonTinder>
      </Link>,
    ]}
  />
);
