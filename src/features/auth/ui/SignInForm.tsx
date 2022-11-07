import './SignInForm.scss';

import { CheckboxTinder, InputTinder, PasswordTinder } from 'shared/ui';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui/ButtonTinder/ButtonTinder';
import { Form } from 'antd';
import { IError } from 'shared/lib/types';
import React from 'react';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { IUserAuthRequest } from '../lib';
import { authAPI, logIn } from '../model';

const { Item } = Form;

export const SignInForm: React.FC = () => {
  const [signIn, { isLoading }] = authAPI.useLogInMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: IUserAuthRequest) => {
    try {
      const { email, password } = values;
      const userDto = await signIn({ email, password }).unwrap();
      dispatch(logIn(userDto));
      navigate(`/profile/${userDto.userId}`);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Form
      className="signin-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1 className="signin-form__title">Вход</h1>
      <Item
        label="Логин"
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
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
          },
        ]}
      >
        <InputTinder
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Item>
      <Item
        label="Пароль"
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
        <PasswordTinder
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Введите пароль"
        />
      </Item>
      <Item
        className="signin-form__item"
        name="remember"
        valuePropName="checked"
      >
        <CheckboxTinder>Запомнить меня?</CheckboxTinder>
        <Link to="/forgot" className="signin-form__forgot">
          Забыли пароль?
        </Link>
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
        Ещё не с нами? <Link to="/signup">Зарегистрируйтесь</Link>
      </Item>
    </Form>
  );
};
