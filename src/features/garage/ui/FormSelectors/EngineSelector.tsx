import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const EngineSelector: React.FC = () => {
  const [engines, setEngines] = useState<ICarProperty[] | null>(null);
  const [useEngines, { isLoading }] = carAPI.useLazyCarEnginesQuery();

  const getEngines = async () => {
    try {
      const res = await useEngines('');
      setEngines(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Item
      label="Выберите тип двигателя"
      name="engine"
      rules={[{ required: true }]}
    >
      <Select loading={isLoading} onClick={getEngines}>
        {engines?.length &&
          engines.map((engine) => (
            <Option key={engine.id} value={engine.id}>
              {engine.name}
            </Option>
          ))}
      </Select>
    </Item>
  );
};
