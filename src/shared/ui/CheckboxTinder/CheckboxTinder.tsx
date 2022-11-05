import './CheckboxTinder.scss';

import { Checkbox, CheckboxProps } from 'antd';

import React from 'react';
import classNames from 'classnames';

export const CheckboxTinder: React.FC<CheckboxProps> = (props) => {
  const className = classNames('checkbox-tinder');

  return <Checkbox className={className} {...props} />;
};
