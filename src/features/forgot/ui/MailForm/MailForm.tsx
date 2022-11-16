import './MailForm.scss';

import { Button, Form, Input, Space } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui/ButtonTinder/ButtonTinder';
import { IError } from 'shared/lib/types';
import { Link } from 'react-router-dom';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { routing } from 'shared/routing';
import { ForgotError } from './ForgotError/ForgotError';
import { ForgotError404 } from './ForgotError/ForgotError404';
import { ForgotSuccess } from './ForgotSuccess/ForgotSuccess';
import { IUserForgotRequest } from '../../lib';
import { forgotAPI } from '../../model';

const { Item } = Form;

export const MailForm: React.FC = () => {
  const [forgot, { isLoading, isSuccess, isError, error, reset }] =
    forgotAPI.useForgotPasswordMutation();

  const onFinish = async (values: IUserForgotRequest) => {
    try {
      const { email } = values;
      console.log(email);
      await forgot({ email }).unwrap();
    } catch (e) {
      ApiError(e as IError);
    }
  };

  if (isSuccess) return <ForgotSuccess />;
  if (isError)
    if ((error as IError).status === 404)
      return <ForgotError404 reset={reset} />;
    else return <ForgotError />;

  return (
    <Form
      className="forgot-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <h2>Востановление пароля</h2>
        <Link to={routing.signIn}>
          <Button>Вход</Button>
        </Link>
      </Space>
      <Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Введите ваш email',
            min: 1,
          },
          {
            required: false,
            message: 'Введите корректый email',
            pattern: /^[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Item>
      <Item className="forgot-form__item">
        <ButtonTinder
          className="forgot-form__submit"
          theme="accept"
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          Отправить запрос
        </ButtonTinder>
      </Item>
    </Form>
  );
};
