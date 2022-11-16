import { Button, Card, Modal } from 'antd';
import React, { useState } from 'react';

import { EditFilled } from '@ant-design/icons';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';
import { FilterForm } from './FilterAddForm/FilterForm';
import { CarFiltersSuccess } from './CarFiltersSuccess';

interface IProps {
  carId: string;
}

export const CarFilters: React.FC<IProps> = ({ carId }) => {
  const [open, setOpen] = useState(false);
  const {
    data: filter,
    isLoading,
    isSuccess,
    isError,
    error,
  } = carAPI.useCarFilterQuery(carId);

  if (isLoading) return <span>Загрузка...</span>;

  if (isSuccess)
    return (
      <Card
        title="Предпочтения для обмена"
        bordered={false}
        style={{ width: '100%' }}
        extra={
          <Button onClick={() => setOpen(true)}>
            <EditFilled />
          </Button>
        }
      >
        <CarFiltersSuccess filter={filter} />
        <Modal
          title="Изменить предпочтения для обмена"
          centered
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
        >
          <FilterForm initialValues={filter} carId={carId} r="patch" />
        </Modal>
      </Card>
    );

  if (isError)
    if ((error as IError).status === 404) return <span>Создание...</span>;
    else return <span>Неизвестная ошибка...</span>;

  return <span>Скелетон</span>;
};
