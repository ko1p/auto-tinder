import { Form, Input, Space } from 'antd';

import React from 'react';

const { Item } = Form;

export const NumberSelectors: React.FC = () => (
  <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
    <Item
      style={{ width: '60%' }}
      label="VIN"
      name="vinCode"
      rules={[{ required: true, min: 17, max: 17 }]}
    >
      <Input />
    </Item>
    <Item
      style={{ width: '40%' }}
      labelCol={{ span: 20 }}
      label="Гос. Номер"
      name="stateNumber"
      rules={[
        {
          required: true,
          message: 'А000АА00',
          pattern: /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/,
        },
      ]}
    >
      <Input />
    </Item>
  </Space.Compact>
);
