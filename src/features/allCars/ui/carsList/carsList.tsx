import { TCar } from 'features/allCars/lib';
import { carsAPI } from 'features/allCars/model/carsServices';
import React, { FC } from 'react';
import { Car } from '../cars/Car';
import './carsList.scss';

const CarsList: FC<{ content: Array<TCar> | undefined }> = ({ content }) => (
  <ul className="cars-list">
    {content?.map((element) => (
      <li key={element.id}>
        <Car car={element} />
      </li>
    ))}
  </ul>
);

export { CarsList };
