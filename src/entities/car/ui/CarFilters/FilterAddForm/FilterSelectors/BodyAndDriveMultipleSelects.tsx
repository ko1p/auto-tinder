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
  initialBodies?: ICarProperty[];
  initialDrives?: ICarProperty[];
}
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
  initialValues: IinitialValues;
}

export const BodyAndDriveMultipleSelects: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
  initialValues: { initialBodies, initialDrives },
}) => {
  useEffect(() => {
    console.log(form.getFieldValue('bodies'));

    form.setFieldValue(
      'bodies',
      initialBodies?.map(({ id, name }) => ({
        key: id,
        value: id,
        children: name,
        label: name,
      }))
    );
    form.setFieldValue(
      'drives',
      initialDrives?.map(({ id, name }) => ({
        key: id,
        value: id,
        children: name,
        label: name,
      }))
    );
    setIsReset(false);
  }, [isReset]);

  const [bodies, setBodies] = useState<ICarProperty[] | null>(null);
  const [useBodies, { isLoading: bodyIsLoading }] =
    carAPI.useLazyCarBodiesQuery();
  const [drives, setDrives] = useState<ICarProperty[] | null>(null);
  const [useDrives, { isLoading: driveIsLoading }] =
    carAPI.useLazyCarDrivesQuery();

  const getDrives = async () => {
    try {
      const res = await useDrives('');
      setDrives(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  const getBodies = async () => {
    try {
      const res = await useBodies('');
      setBodies(res.data!);
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
        label="Кузов"
        name="bodies"
        rules={[{ required: false }]}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Выберите кузовы"
          loading={bodyIsLoading}
          onClick={getBodies}
          onChange={() => console.log(form.getFieldValue('bodies'))}
          optionFilterProp="label"
        >
          {bodies?.length &&
            bodies.map((body) => (
              <Option key={body.id} value={body.id} label={body.name}>
                {body.name}
              </Option>
            ))}
        </Select>
      </Item>
      <Item
        style={{ width: '50%' }}
        labelCol={{ span: 20 }}
        label="Привод"
        name="drives"
        rules={[{ required: false }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Выберите приводы"
          loading={driveIsLoading}
          onClick={getDrives}
          optionFilterProp="label"
        >
          {drives?.length &&
            drives.map((drive) => (
              <Option key={drive.id} value={drive.id} label={drive.name}>
                {drive.name}
              </Option>
            ))}
        </Select>
      </Item>
    </Space.Compact>
  );
};
