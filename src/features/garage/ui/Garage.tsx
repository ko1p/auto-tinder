import { Col, Drawer, Empty, Row } from 'antd';
import React, { useState } from 'react';

import { ButtonTinder } from 'shared/ui';
import { CarAddForm } from './CarAddForm/CarAddForm';
import { CarCard } from 'entities/car/ui/CarCard';
import { garageAPI } from '../model/query/garageService';
import { useParams } from 'react-router-dom';

export const Garage = () => {
  const params = useParams();
  const {
    data: cars,
    isLoading,
    isSuccess,
    isError,
  } = garageAPI.useUserCarsQuery(params.userId!);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <section className="garage">
        {isLoading && 'Загрузка...'}
        {isSuccess && (
          <Row gutter={[16, 16]}>
            {cars?.map((car) => (
              <Col key={car.id} span={8}>
                <CarCard car={car} />
              </Col>
            ))}
            <Col span={8}>
              <Empty
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              >
                <ButtonTinder
                  onClick={showDrawer}
                  theme="accent"
                  type="primary"
                >
                  Добавить авто!
                </ButtonTinder>
              </Empty>
            </Col>
          </Row>
        )}
        {isError && 'Ошибка'}
      </section>
      <Drawer
        title="Добавить новый автомобиль"
        width={360}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <CarAddForm />
      </Drawer>
    </>
  );
};
