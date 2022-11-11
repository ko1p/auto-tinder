import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const CitiesSelect: React.FC = () => {
  const [cities, setCities] = useState<ICarProperty[] | null>(null);
  const [useCities, { isLoading }] = carAPI.useLazyCarCitiesQuery();

  const getCities = async () => {
    try {
      const res = await useCities('');
      setCities(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Item
      style={{ width: '100%' }}
      labelCol={{ span: 20 }}
      label="Выберите города для обмена"
      name="exchangeCities"
      rules={[{ required: true }]}
    >
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Выберите города"
        loading={isLoading}
        onClick={getCities}
      >
        {cities?.length &&
          cities.map((city) => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
      </Select>
    </Item>
  );
};
