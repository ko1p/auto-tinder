import './UserCar.scss';

import { CarInfo } from 'entities/car/ui/CarInfo';
import React from 'react';
import { useParams } from 'react-router';

export const UserCar = () => {
  const params = useParams();

  return (
    <>
      <section className="usercar-wrapper">
        <section className="usercar">
          <CarInfo carId={params.carId!} />
        </section>
      </section>
      <section className="usercar-bg" />
    </>
  );
};
