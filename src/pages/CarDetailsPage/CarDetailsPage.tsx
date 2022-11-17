import './CarDetailsPage.scss';

import React, { FC } from 'react';
import {
  isAdminSelector,
  userSelector,
} from 'entities/user/model/state/authSelector';

import { AdminUserControl } from 'features/admin/ui/AdminUserControl';
import { CarDetails } from 'features/allCars/ui/carDetails/CarDetails';
import { ICar } from 'entities/car/lib/types';
import { carsAPI } from 'features/allCars/model/carsServices';
import { garageAPI } from 'features/garage/model/query/garageService';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { useParams } from 'react-router';

const CarDetailsPage: FC = () => {
  const { id } = useParams();
  const { data } = carsAPI.useGetCarsDetailsQuery(id);
  const userId = useAppSelector(userSelector);
  const isAdmin = useAppSelector(isAdminSelector);
  let exchangeCar: ICar | undefined;
  if (userId) {
    const { data: cars } = garageAPI.useUserCarsQuery(userId);
    exchangeCar = cars?.filter((car) => car.isExchanged)[0];
  }
  return data ? (
    <>
      <CarDetails car={data} exchangeId={exchangeCar?.id} />
      {isAdmin && (
        <AdminUserControl userId={`${data.user.id}`} carId={`${data.id}`} />
      )}
    </>
  ) : (
    <h2 className="car-details-page__text">
      Запрашиваемой вами машины не существует!!!
    </h2>
  );
};

export { CarDetailsPage };
