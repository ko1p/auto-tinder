import { Form, Select, Space } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const EngineAndGearboxSelector: React.FC = () => {
  const [engines, setEngines] = useState<ICarProperty[] | null>(null);
  const [useEngines, { isLoading: isEngineLoading }] =
    carAPI.useLazyCarEnginesQuery();
  const [gearBoxes, setGearBoxes] = useState<ICarProperty[] | null>(null);
  const [useGearBoxes, { isLoading: isGearBoxLoading }] =
    carAPI.useLazyCarGearBoxesQuery();

  const getGearBoxes = async () => {
    try {
      const res = await useGearBoxes('');
      setGearBoxes(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  const getEngines = async () => {
    try {
      const res = await useEngines('');
      setEngines(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
      <Item
        style={{ width: 150 }}
        labelCol={{ span: 20 }}
        label="Тип коробки"
        name="gearbox"
        rules={[{ required: true }]}
      >
        <Select loading={isEngineLoading} onClick={getGearBoxes}>
          {gearBoxes?.length &&
            gearBoxes.map((gearBox) => (
              <Option key={gearBox.id} value={gearBox.id}>
                {gearBox.name}
              </Option>
            ))}
        </Select>
      </Item>
      <Item
        style={{ width: 150 }}
        labelCol={{ span: 20 }}
        label="Тип двигателя"
        name="engine"
        rules={[{ required: true }]}
      >
        <Select loading={isGearBoxLoading} onClick={getEngines}>
          {engines?.length &&
            engines.map((engine) => (
              <Option key={engine.id} value={engine.id}>
                {engine.name}
              </Option>
            ))}
        </Select>
      </Item>
    </Space.Compact>
  );
};
