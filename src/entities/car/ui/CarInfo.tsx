import './CarInfo.scss';

import React from 'react';
import { CarCommonCharacteristics } from './CarCommonCharacteristics/CarCommonCharacteristics';
import CarDescription from './CarDescription/CarDescription';
import { CarFilters } from './CarFilters/CarFilters';
import { CarTechCaracteristics } from './CarTechCharacteristics/CarTechCaracteristics';
import { carAPI } from '../model/CarService';

interface IProps {
  carId: string;
}

export const CarInfo: React.FC<IProps> = ({ carId }) => {
  const { data: car, isLoading, isSuccess } = carAPI.useUserCarInfoQuery(carId);

  if (isLoading) return <span>Загрузка...</span>;

  if (isSuccess)
    return (
      <article className="usercar__info">
        <CarCommonCharacteristics
          carId={carId}
          brand={car.brand.name}
          model={car.model.name}
          owner={car.user.name}
          totalLikes={car.totalLikes}
          totalViews={car.totalViews}
          todayLikes={car.todayLikes}
          todayViews={car.todayViews}
          isExchanged={car.isExchanged}
          price={car.price}
          photos={car.photos}
        />
        <CarTechCaracteristics
          carId={carId}
          body={car.body}
          drive={car.drive}
          engine={car.engine}
          gearbox={car.gearbox}
        />
        <CarDescription
          carId={carId}
          brand={car.brand.name}
          model={car.model.name}
          vinCode={car.vinCode}
          stateNumber={car.stateNumber}
          manufacturedAt={car.manufacturedAt}
          mileage={car.mileage}
          description={car.description}
          totalOwners={car.totalOwners}
        />
        <CarFilters carId={carId!} />
      </article>
    );

  return <span>Скелетон</span>;
};
