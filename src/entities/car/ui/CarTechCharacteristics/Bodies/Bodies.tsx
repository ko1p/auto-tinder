import { Segmented, Skeleton } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import React from 'react';
import { SegmentedValue } from 'antd/lib/segmented';
import { carAPI } from 'entities/car/model/CarService';

interface IProps {
  body: ICarProperty;
  carId: string;
  isChangeable: boolean;
}

export const CarTechCaracteristicsBodies: React.FC<IProps> = ({
  body,
  carId,
  isChangeable,
}) => {
  const { data: bodies, isSuccess } = carAPI.useCarBodiesQuery('');
  const [patch, { isLoading }] = carAPI.usePatchUserCarInfoMutation();

  const change = async (checkedName: SegmentedValue) => {
    const checkedBody = bodies?.find(({ name }) => checkedName === name);

    try {
      await patch({ carId, data: { body: checkedBody?.id } });
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
        value={body.name}
        options={bodies.map(({ name }) => {
          if (name === body.name) return name;
          return { label: name, value: name, disabled: !isChangeable };
        })}
      />
    );
  return <Skeleton.Input />;
};
