import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const GearBoxSelector: React.FC = () => {
  const [gearBoxes, setGearBoxes] = useState<ICarProperty[] | null>(null);
  const [useGearBoxes, { isLoading }] = carAPI.useLazyCarGearBoxesQuery();

  const getGearBoxes = async () => {
    try {
      const res = await useGearBoxes('');
      setGearBoxes(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Item
      label="Выберите тип коробки"
      name="gearbox"
      rules={[{ required: true }]}
    >
      <Select loading={isLoading} onClick={getGearBoxes}>
        {gearBoxes?.length &&
          gearBoxes.map((gearBox) => (
            <Option key={gearBox.id} value={gearBox.id}>
              {gearBox.name}
            </Option>
          ))}
      </Select>
    </Item>
  );
};
