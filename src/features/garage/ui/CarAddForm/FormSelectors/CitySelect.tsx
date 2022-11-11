import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Select, Space, Switch } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const CitySelector: React.FC = () => {
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
    <Space.Compact block style={{ alignItems: 'center' }}>
      <Item
        style={{ width: 150 }}
        label="желаете обмен"
        name="isExchanged"
        valuePropName="isExchanged"
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Item>
      <Item
        style={{ width: 150 }}
        labelCol={{ span: 20 }}
        label="Выберите город для обмена"
        name="exchangeCity"
        rules={[{ required: true }]}
      >
        <Select loading={isLoading} onClick={getCities}>
          {cities?.length &&
            cities.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
        </Select>
      </Item>
    </Space.Compact>
  );
};
