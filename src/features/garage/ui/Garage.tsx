import './Garage.scss';

import { Carousel, Drawer, Empty } from 'antd';
import React, { useState } from 'react';

import { ButtonTinder } from 'shared/ui';
import { CarCard } from 'entities/car/ui/CarCard';
import { useParams } from 'react-router-dom';
import { CarAddForm } from './CarAddForm';
import { garageAPI } from '../model/query/garageService';

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
        {isSuccess && cars?.length ? (
          <Carousel className="garage__carousel" dots autoplay>
            {cars.map((car) => (
              <CarCard key={car.id} type="garage" car={car} />
            ))}
            <Empty
              className="garage__item_empty"
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              description={<span>У вас есть ещё автомобиль?</span>}
            >
              <ButtonTinder onClick={showDrawer} theme="accent" type="primary">
                Добавить в гараж!
              </ButtonTinder>
            </Empty>
          </Carousel>
        ) : (
          <Empty
            className="garage__item_empty"
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description={
              <span>Вы ёще не добавили автомобили в ваш гараж...</span>
            }
          >
            <ButtonTinder onClick={showDrawer} theme="accent" type="primary">
              Добавить сейчас!
            </ButtonTinder>
          </Empty>
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
