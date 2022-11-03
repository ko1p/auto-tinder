import { ConfigProvider } from 'antd';
import React from 'react';
import ruRU from 'antd/es/locale/ru_RU';

const withAntdConfig = (component: () => React.ReactNode) => () =>
  <ConfigProvider locale={ruRU}>{component()}</ConfigProvider>;

export default withAntdConfig;
