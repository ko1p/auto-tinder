import './SignUpForm.scss';

import { Button, Form, Input, Space } from 'antd';
import { ButtonTinder, CheckboxTinder } from 'shared/ui';
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import { routing } from 'shared/routing';
import { IUserRegistrationRequest } from '../lib';
import { registrationAPI } from '../model';

const { Item } = Form;
const { Password } = Input;

export const SignUpForm: React.FC = () => {
  const [isPrivacyRead, setIsPrivacyRead] = useState(false);
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
        <h2>Регистрация</h2>
        <Link to={routing.signIn}>
          <Button>Вход</Button>
        </Link>
      </Space>
      <Item
        className="signup-form__email"
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Введите ваш Email"
        />
      </Item>
      <Item
        className="signup-form__password"
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
      <Item
        className="signup-form__fio"
        name="name"
        rules={[
          {
            required: true,
            message: 'Введите Имя',
            pattern: /^[А-Я]{1}[а-я]{1,29}$/,
          },
        ]}
      >
        <Input
          prefix={<InfoCircleOutlined className="site-form-item-icon" />}
          placeholder="Введите Имя"
        />
      </Item>

      <Item
        className="signin-form__item"
        name="remember"
        valuePropName="checked"
      >
        <CheckboxTinder disabled={!isPrivacyRead}>Я прочитал(а)</CheckboxTinder>
        <Link
          onClick={() => setIsPrivacyRead(true)}
          target="_blank"
          to={routing.privacy}
        >
          соглашение!
        </Link>
      </Item>

      <Item className="signup-form__submit">
        <ButtonTinder
          theme="accept"
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="signup-form__submit-button"
        >
          Зарегистрироваться
        </ButtonTinder>
      </Item>
    </Form>
  );
};
