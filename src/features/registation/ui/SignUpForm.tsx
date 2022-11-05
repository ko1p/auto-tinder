import './SignUpForm.scss';

import { ButtonTinder, InputTinder, PasswordTinder } from 'shared/ui';
import { Form, Space } from 'antd';
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import { IUserRegistrationRequest } from '../lib';
import { registrationAPI } from '../model';

const { Item } = Form;

export const SignUpForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [registation, { isLoading }] =
    registrationAPI.useRegistrationMutation();
  const navigate = useNavigate();

  const onFinish = async (values: IUserRegistrationRequest) => {
    try {
      const { email, password, name } = values;
      await registation({ email, password, name }).unwrap();
      navigate('/signin');
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Form
      className="signup-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1 className="signup-form__title">Регистрация</h1>
      <Item
        className="signup-form__email"
        label="Ваша почта"
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
          placeholder="Введите ваш Email"
        />
      </Item>
      <Item
        className="signup-form__password"
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
        <Space direction="horizontal" className="signup-form__password-space">
          <PasswordTinder
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Введите пароль"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
          />
          <ButtonTinder
            theme="main"
            onClick={() => setPasswordVisible((state: boolean) => !state)}
          >
            {passwordVisible ? 'Скрыть' : 'Показать'}
          </ButtonTinder>
        </Space>
      </Item>

      <Item
        className="signup-form__password"
        label="Повторите пароль"
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
        <Space direction="horizontal" className="signup-form__password-space">
          <PasswordTinder
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Повторите пароль"
            visibilityToggle={{
              visible: repeatPasswordVisible,
              onVisibleChange: setRepeatPasswordVisible,
            }}
          />
          <ButtonTinder
            theme="main"
            onClick={() => setRepeatPasswordVisible((state: boolean) => !state)}
          >
            {repeatPasswordVisible ? 'Скрыть' : 'Показать'}
          </ButtonTinder>
        </Space>
      </Item>

      <Item
        className="signup-form__fio"
        label="ФИО"
        name="name"
        rules={[
          {
            required: true,
            message: 'Введите ФИО',
            pattern:
              /^[А-ЯA-Z][а-яa-z-]+|^[А-ЯA-Z][а-яa-z-]+\s[A-ZА-Я][а-яa-z-]+[а-яa-z]$/,
          },
        ]}
      >
        <InputTinder
          prefix={<InfoCircleOutlined className="site-form-item-icon" />}
          placeholder="Введите ФИО"
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
          Войти
        </ButtonTinder>
        Уже зарегистрированы? <Link to="/signin">Войдите в систему!</Link>
      </Item>
    </Form>
  );
};
