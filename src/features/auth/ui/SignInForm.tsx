import './SignInForm.scss';

import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { IUserAuthRequest } from '../lib';
import { Link } from 'react-router-dom';
import React from 'react';
import { authAPI } from '../model';

const { Item } = Form;

export const SignInForm: React.FC = () => {
  const [logIn, { isLoading, isError, isSuccess }] = authAPI.useLogInMutation();

  const onFinis = async (values: IUserAuthRequest) => {

    console.log('Received values of form: ', values);
    await logIn(values);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinis}
    >
      <Typography>Регистрация</Typography>
      <Item name='email' rules={[{ required: true, type: 'email', message: 'Введите ваш email' }]}>
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Item>
      <Item name='password' rules={[{ required: true, message: 'Введите ваш пароль' }]}>
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Item>
      <Item>
        <Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Item>

        <Link to='/forgot' className='login-form-forgot'>
          Забыли пароль?
        </Link>
      </Item>

      <Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Войти
        </Button>
        Нет зарегистрированы? Перейти к <Link to='/signup'>регистрации!</Link>
      </Item>
    </Form>
  );
};
