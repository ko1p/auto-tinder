import './SpinPage.scss';

import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { Spin } from 'antd';

export const SpinPage = () => (
  <div className="spin-page">
    <Spin
      size="large"
      indicator={<LoadingOutlined className="spin-indicator" />}
    />
    <p className="spin-page__description">Загрузка</p>
  </div>
);
