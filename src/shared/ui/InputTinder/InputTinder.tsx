import './InputTinder.scss';

import { Input, InputProps } from 'antd';
import Password, { PasswordProps } from 'antd/lib/input/Password';

import React from 'react';
import classNames from 'classnames';

export const InputTinder: React.FC<InputProps> = ({ className, ...props }) => (
  <Input className={classNames('input-tinder', className || '')} {...props} />
);

export const PasswordTinder: React.FC<PasswordProps> = ({
  className,
  ...props
}) => (
  <Password
    className={classNames('input-tinder', className || '')}
    {...props}
  />
);
