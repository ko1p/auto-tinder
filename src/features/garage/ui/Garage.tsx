import { Col, Drawer, Empty, Row } from 'antd';
import React, { useState } from 'react';

import { ButtonTinder } from 'shared/ui';
import { CarCard } from 'entities/car/ui/CarCard';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { userSelector } from 'entities/user/model/state/authSelector';
import { garageAPI } from '../model/query/garageService';
import { CarAddForm } from './CarAddForm/CarAddForm';

export const Garage = () => {
  const userId = useAppSelector(userSelector);
  const {
    data: cars,
    isLoading,
    isSuccess,
    isError,
  } = garageAPI.useUserCarsQuery(userId!);

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
              <Col
                key={car.id}
                md={{ span: 8 }}
                sm={{ span: 12 }}
                xs={{ span: 24 }}
              >
                <CarCard car={car} />
              </Col>
            ))}
            <Col md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
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
