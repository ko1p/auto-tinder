import { Segmented, Skeleton } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import React from 'react';
import { SegmentedValue } from 'antd/lib/segmented';
import { carAPI } from 'entities/car/model/CarService';

interface IProps {
  drive: ICarProperty;
  carId: string;
  isChangeable: boolean;
}

export const CarTechCaracteristicsDrives: React.FC<IProps> = ({
  drive,
  carId,
  isChangeable,
}) => {
  const { data: drives, isSuccess } = carAPI.useCarDrivesQuery('');
  const [patch, { isLoading }] = carAPI.usePatchUserCarInfoMutation();
  const change = async (checkedName: SegmentedValue) => {
    const checkedDrive = drives?.find(({ name }) => checkedName === name);

    try {
      await patch({ carId, data: { drive: checkedDrive?.id } });
    } catch (err) {
      ApiError(err as IError);
    }
  };

  console.log(isChangeable);

  if (isSuccess)
    return (
      <Segmented
        style={{ overflow: 'auto' }}
        disabled={isLoading}
        onChange={change}
        value={drive.name}
        options={drives.map(({ name }) => {
          if (name === drive.name) return name;
          return { label: name, value: name, disabled: !isChangeable };
        })}
      />
    );
  return <Skeleton.Input />;
};
