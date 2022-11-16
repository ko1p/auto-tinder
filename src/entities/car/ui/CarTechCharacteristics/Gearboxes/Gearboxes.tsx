import { Segmented, Skeleton } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import React from 'react';
import { SegmentedValue } from 'antd/lib/segmented';
import { carAPI } from 'entities/car/model/CarService';

interface IProps {
  gearbox: ICarProperty;
  carId: string;
  isChangeable: boolean;
}

export const CarTechCaracteristicsGearboxes: React.FC<IProps> = ({
  gearbox,
  carId,
  isChangeable,
}) => {
  const { data: gearboxes, isSuccess } = carAPI.useCarGearBoxesQuery('');
  const [patch, { isLoading }] = carAPI.usePatchUserCarInfoMutation();

  const change = async (checkedName: SegmentedValue) => {
    const checkedGearbox = gearboxes?.find(({ name }) => checkedName === name);

    try {
      await patch({ carId, data: { gearbox: checkedGearbox! } });
    } catch (err) {
      ApiError(err as IError);
    }
  };

  if (isSuccess)
    return (
      <Segmented
        style={{ overflow: 'auto' }}
        disabled={isLoading}
        onChange={change}
        value={gearbox.name}
        options={gearboxes.map(({ name }) => {
          if (name === gearbox.name) return name;
          return { label: name, value: name, disabled: !isChangeable };
        })}
      />
    );
  return <Skeleton.Input />;
};
