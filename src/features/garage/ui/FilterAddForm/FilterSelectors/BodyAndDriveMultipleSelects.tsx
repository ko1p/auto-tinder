import { Form, FormInstance, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { IResetState } from 'features/garage/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
}

export const BodyAndDriveMultipleSelects: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
}) => {
  useEffect(() => {
    form.setFieldValue('body', undefined);
    form.setFieldValue('drive', undefined);
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
    <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
      <Item
        style={{ width: 150 }}
        labelCol={{ span: 20 }}
        label="Кузов"
        name="body"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Выберите кузовы"
          loading={bodyIsLoading}
          onClick={getBodies}
        >
          {bodies?.length &&
            bodies.map((body) => (
              <Option key={body.id} value={body.id}>
                {body.name}
              </Option>
            ))}
        </Select>
      </Item>
      <Item
        style={{ width: 150 }}
        labelCol={{ span: 20 }}
        label="Привод"
        name="drive"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Выберите приводы"
          loading={driveIsLoading}
          onClick={getDrives}
        >
          {drives?.length &&
            drives.map((drive) => (
              <Option key={drive.id} value={drive.id}>
                {drive.name}
              </Option>
            ))}
        </Select>
      </Item>
    </Space.Compact>
  );
};
