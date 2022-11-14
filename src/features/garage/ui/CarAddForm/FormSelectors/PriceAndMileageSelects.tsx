import { Form, FormInstance, InputNumber, Space } from 'antd';
import React, { useEffect } from 'react';

import { IResetState } from 'features/garage/lib/types';

const { Item } = Form;
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
}
export const PriceAndMileageSelectors: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
}) => {
  useEffect(() => {
    form.setFieldValue('mileage', 0);
    form.setFieldValue('price', 0);
    setIsReset(false);
  }, [isReset]);

  return (
    <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
      <Item
        style={{ width: '60%' }}
        labelCol={{ span: 20 }}
        label="Цена в рублях"
        name="price"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Item>
      <Item
        style={{ width: '40%' }}
        labelCol={{ span: 20 }}
        label="Пробег"
        name="mileage"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Item>
    </Space.Compact>
  );
};
