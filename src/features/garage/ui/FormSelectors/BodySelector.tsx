import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const BodySelector: React.FC = () => {
  const [bodies, setBodies] = useState<ICarProperty[] | null>(null);
  const [useBodies, { isLoading }] = carAPI.useLazyCarBodiesQuery();

  const getBodies = async () => {
    try {
      const res = await useBodies('');
      setBodies(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Item label="Кузов" name="body" rules={[{ required: true }]}>
      <Select loading={isLoading} onClick={getBodies}>
        {bodies?.length &&
          bodies.map((body) => (
            <Option key={body.id} value={body.id}>
              {body.name}
            </Option>
          ))}
      </Select>
    </Item>
  );
};
