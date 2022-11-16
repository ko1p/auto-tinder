import './ButtonTinderAccept.scss';
import './ButtonTinderCancel.scss';
import './ButtonTinderMain.scss';
import './ButtonTinderAccent.scss';

import { Button, ButtonProps } from 'antd';

import React from 'react';
import classNames from 'classnames';

interface IButtonProps extends ButtonProps {
  theme: 'main' | 'accent' | 'cancel' | 'accept';
  sliced?: 'left' | 'right' | 'both';
  hasShadow?: boolean;
}

export const ButtonTinder: React.FC<IButtonProps> = ({
  children,
  ...props
}) => {
  const className = classNames(
    `button-tinder-${props.theme}`,
    props.sliced
      ? `button-tinder-${props.theme}_sliced-${props.sliced}`
      : false,
    props.hasShadow && `button-tinder-${props.theme}_has-shadow`,
    props.className
  );

  return (
    <Button {...props} className={className}>
      {children}
    </Button>
  );
};
