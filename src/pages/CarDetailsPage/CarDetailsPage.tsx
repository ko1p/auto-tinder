import { carsAPI } from 'features/allCars/model/carsServices';
import { CarDetails } from 'features/allCars/ui/carDetails/CarDetails';
import React, { FC } from 'react';
import { useParams } from 'react-router';
import './CarDetailsPage.scss';

const CarDetailsPage: FC = () => {
  const { id } = useParams();
  const { data } = carsAPI.useGetCarsDetailsQuery(id);
  console.log(data);
  return data ? (
    <CarDetails car={data} />
  ) : (
    <h2 className="car-details-page__text">
      Запрашиваемой вами машины не существует!!!
    </h2>
  );
};

export { CarDetailsPage };
