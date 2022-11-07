import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const DriveSelector: React.FC = () => {
  const [drives, setDrives] = useState<ICarProperty[] | null>(null);
  const [useDrives, { isLoading }] = carAPI.useLazyCarDrivesQuery();

  const getDrives = async () => {
    try {
      const res = await useDrives('');
      setDrives(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Item label="Привод" name="drive" rules={[{ required: true }]}>
      <Select loading={isLoading} onClick={getDrives}>
        {drives?.length &&
          drives.map((drive) => (
            <Option key={drive.id} value={drive.id}>
              {drive.name}
            </Option>
          ))}
      </Select>
    </Item>
  );
};
