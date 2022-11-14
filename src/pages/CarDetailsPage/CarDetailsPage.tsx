import { ICar } from 'entities/car/lib/types';
import { userSelector } from 'entities/user/model/state/authSelector';
import { carsAPI } from 'features/allCars/model/carsServices';
import { CarDetails } from 'features/allCars/ui/carDetails/CarDetails';
import { garageAPI } from 'features/garage/model/query/garageService';
import React, { FC } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from 'shared/lib/hooks/redux';
import './CarDetailsPage.scss';

const CarDetailsPage: FC = () => {
  const { id } = useParams();
  const { data } = carsAPI.useGetCarsDetailsQuery(id);
  const userId = useAppSelector(userSelector);
  let exchangeCar: ICar | undefined;
  if (userId) {
    const { data: cars } = garageAPI.useUserCarsQuery(userId);
    exchangeCar = cars?.filter((car) => car.isExchanged)[0];
  }
  return data ? (
    <CarDetails car={data} exchangeId={exchangeCar?.id} />
  ) : (
    <h2 className="car-details-page__text">
      Запрашиваемой вами машины не существует!!!
    </h2>
  );
};

export { CarDetailsPage };
