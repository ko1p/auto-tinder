import { Button, Form, Input, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import { LockOutlined } from '@ant-design/icons';
import { forgotAPI } from 'features/forgot/model';
import { routing } from 'shared/routing';
import { ChangeSuccess } from './ChangeSuccess/ChangeSuccess';
import { ChangeError404 } from './ChangeError/ChangeError404';
import { ChangeError } from './ChangeError/ChangeError';

const { Item } = Form;
const { Password } = Input;

export const PasswordForm = () => {
  const params = useParams();
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [changePassword, { isLoading, isSuccess, isError, error }] =
    forgotAPI.useResetPasswordMutation();

  const onFinish = async (values: { password: string }) => {
    try {
      const { password } = values;
      await changePassword({
        password,
        recoveryToken: params.recoveryToken!,
      }).unwrap();
    } catch (e) {
      ApiError(e as IError);
    }
  };

  if (isSuccess) return <ChangeSuccess />;
  if (isError)
    if ((error as IError).status === 404) return <ChangeError404 />;
    else return <ChangeError />;

  return (
    <Form
      className="forgot-form"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <h2>Смена пароля</h2>
        <Link to={routing.signIn}>
          <Button>Вход</Button>
        </Link>
      </Space>
      <Item
        className="signup-form__password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Введите новый пароль',
          },
          {
            required: false,
            message: 'Длина пароля не может ниже восьми символов',
            min: 8,
          },
          {
            required: false,
            message:
              'Пароль не может состоять из букв цифр и следующих символов !@#$%^&*(){}[]',
            pattern: /^[A-Za-z0-9!@#$%^&*(){}[\]]+$/,
          },
        ]}
      >
        <Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Введите новый пароль"
        />
      </Item>

      <Item
        className="signup-form__password"
        name="password_repeat"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Подтвердите пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Повторите пароль"
          visibilityToggle={{
            visible: repeatPasswordVisible,
            onVisibleChange: setRepeatPasswordVisible,
          }}
        />
      </Item>

      <Item className="signup-form__submit">
        <ButtonTinder
          theme="accept"
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="signup-form__submit-button"
        >
          Сменить пароль
        </ButtonTinder>
      </Item>
    </Form>
  );
};
