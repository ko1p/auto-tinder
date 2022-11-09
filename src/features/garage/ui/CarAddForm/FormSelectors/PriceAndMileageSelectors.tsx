import { Form, InputNumber, Space } from 'antd';

import React from 'react';

const { Item } = Form;

export const PriceAndMileageSelectors: React.FC = () => (
  <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
    <Item
      style={{ width: '60%' }}
      labelCol={{ span: 20 }}
      label="Цена в рублях"
      name="price"
      rules={[{ required: true }]}
    >
      <InputNumber style={{ width: '100%' }} />
    </Item>
    <Item
      style={{ width: '40%' }}
      labelCol={{ span: 20 }}
      label="Пробег"
      name="mileage"
      rules={[{ required: true }]}
    >
      <InputNumber style={{ width: '100%' }} />
    </Item>
  </Space.Compact>
);
