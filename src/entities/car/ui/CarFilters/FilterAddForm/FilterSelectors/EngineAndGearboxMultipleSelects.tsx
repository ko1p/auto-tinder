import { Form, FormInstance, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { IResetState } from 'features/garage/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

interface IinitialValues {
  initialEngines?: ICarProperty[];
  initialGearboxes?: ICarProperty[];
}
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
  initialValues: IinitialValues;
}

export const EngineAndGearboxMultipleSelects: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
  initialValues: { initialEngines, initialGearboxes },
}) => {
  useEffect(() => {
    form.setFieldValue(
      'gearboxes',
      initialGearboxes?.map(({ id, name }) => ({
        key: id,
        value: id,
        children: name,
        label: name,
      }))
    );
    form.setFieldValue(
      'engines',
      initialEngines?.map(({ id, name }) => ({
        key: id,
        value: id,
        children: name,
        label: name,
      }))
    );
    setIsReset(false);
  }, [isReset]);

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
    <Space.Compact
      block
      style={{ alignItems: 'center', gap: 5, width: '100%' }}
    >
      <Item
        style={{ width: '50%' }}
        labelCol={{ span: 20 }}
        label="Тип коробки"
        name="gearboxes"
        rules={[{ required: false }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Выберите коробки"
          loading={isGearBoxLoading}
          onClick={getGearBoxes}
        >
          {gearBoxes?.length &&
            gearBoxes.map((body) => (
              <Option key={body.id} value={body.id}>
                {body.name}
              </Option>
            ))}
        </Select>
      </Item>
      <Item
        style={{ width: '50%' }}
        labelCol={{ span: 20 }}
        label="Тип двигателя"
        name="engines"
        rules={[{ required: false }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Выберите двигатели"
          loading={isEngineLoading}
          onClick={getEngines}
        >
          {engines?.length &&
            engines.map((drive) => (
              <Option key={drive.id} value={drive.id}>
                {drive.name}
              </Option>
            ))}
        </Select>
      </Item>
    </Space.Compact>
  );
};
