import { Form, FormInstance, Input, Space } from 'antd';
import React, { useEffect } from 'react';

import { IResetState } from 'features/garage/lib/types';

const { Item } = Form;
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
}
export const NumberSelectors: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
}) => {
  useEffect(() => {
    form.setFieldValue('vinCode', '');
    form.setFieldValue('stateNumber', '');
    setIsReset(false);
  }, [isReset]);
  return (
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
            pattern:
              /^[АВЕКМНОРСТУХ|авекмнорстух]\d{3}(?<!000)[АВЕКМНОРСТУХ|авекмнорстух]{2}\d{2,3}$/,
          },
        ]}
      >
        <Input />
      </Item>
    </Space.Compact>
  );
};
