import './SignInForm.scss';

import { Button, Form, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui/ButtonTinder/ButtonTinder';
import { IError } from 'shared/lib/types';
import React from 'react';
import { routing } from 'shared/routing';
import { userSelector } from 'entities/user/model/state/authSelector';
import { IUserAuthRequest } from '../lib';
import { authAPI, logIn } from '../model';

const { Item } = Form;
const { Password } = Input;

export const SignInForm: React.FC = () => {
  const [signIn, { isLoading }] = authAPI.useLogInMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useAppSelector(userSelector);

  const onFinish = async (values: IUserAuthRequest) => {
    try {
      const { email, password } = values;
      const userDto = await signIn({ email, password }).unwrap();
      dispatch(logIn(userDto));
      navigate(routing.navProvile(id!));
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Form
      className="signin-form"
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
        <h2>Вход</h2>
        <Link to={routing.signUp}>
          <Button>Регистрация</Button>
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
      <Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Введите ваш пароль',
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
          placeholder="Введите пароль"
        />
      </Item>
      <Item className="signin-form__item">
        <ButtonTinder
          className="signin-form__submit"
          theme="accept"
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          Войти
        </ButtonTinder>
        Забыли пароль?
        <Link to={routing.forgot} className="signin-form__forgot">
          Восстановить!
        </Link>
      </Item>
    </Form>
  );
};
