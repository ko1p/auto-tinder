import { Form, Select, Space } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const BodyAndDriveSelectors: React.FC = () => {
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
        label="Кузов"
        name="body"
        rules={[{ required: true }]}
      >
        <Select loading={bodyIsLoading} onClick={getBodies}>
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
        label="Привод"
        name="drive"
        rules={[{ required: true }]}
      >
        <Select loading={driveIsLoading} onClick={getDrives}>
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
