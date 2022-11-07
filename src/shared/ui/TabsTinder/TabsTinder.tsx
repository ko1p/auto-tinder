import './TabsTinder.scss';

import { Tabs, TabsProps } from 'antd';

import React from 'react';
import classNames from 'classnames';

export const TabsTinder: React.FC<TabsProps> = ({ className, ...props }) => (
  <Tabs className={classNames('tabs-tinder', className || '')} {...props} />
);
