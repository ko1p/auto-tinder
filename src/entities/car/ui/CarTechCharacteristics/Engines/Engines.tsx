import { Segmented, Skeleton } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import React from 'react';
import { SegmentedValue } from 'antd/lib/segmented';
import { carAPI } from 'entities/car/model/CarService';

interface IProps {
  engine: ICarProperty;
  carId: string;
  isChangeable: boolean;
}

export const CarTechCaracteristicsEngines: React.FC<IProps> = ({
  engine,
  carId,
  isChangeable,
}) => {
  const { data: engines, isSuccess } = carAPI.useCarEnginesQuery('');
  const [patch, { isLoading }] = carAPI.usePatchUserCarInfoMutation();
  const change = async (checkedName: SegmentedValue) => {
    const checkedEngine = engines?.find(({ name }) => checkedName === name);

    try {
      await patch({ carId, data: { engine: checkedEngine! } });
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
        value={engine.name}
        options={engines.map(({ name }) => {
          if (name === engine.name) return name;
          return { label: name, value: name, disabled: !isChangeable };
        })}
      />
    );
  return <Skeleton.Input />;
};
