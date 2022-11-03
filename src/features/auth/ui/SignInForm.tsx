import './SignInForm.scss';

import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import React from 'react';
import { IUserAuthRequest } from '../lib';
import { authAPI } from '../model';

const { Item } = Form;

export const SignInForm: React.FC = () => {
  const [logIn, { isLoading }] = authAPI.useLogInMutation();
  const navigate = useNavigate();

  const onFinish = async (values: IUserAuthRequest) => {
    try {
      const { email, password } = values;
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);
      await logIn(formData.toString()).unwrap();
      navigate('/cars');
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1>Регистрация</h1>
      <Item
        name="email"
        rules={[
          { required: true, type: 'email', message: 'Введите ваш email' },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Item>
      <Item
        name="password"
        rules={[{ required: true, message: 'Введите ваш пароль' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Item>
      <Item>
        <Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Item>

        <Link to="/forgot" className="login-form-forgot">
          Забыли пароль?
        </Link>
      </Item>

      <Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Войти
        </Button>
        Нет зарегистрированы? Перейти к <Link to="/signup">регистрации!</Link>
      </Item>
    </Form>
  );
};
