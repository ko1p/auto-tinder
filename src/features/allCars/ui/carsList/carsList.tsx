import './carsList.scss';

import React, { FC } from 'react';

import { TCar } from 'features/allCars/lib';
import { Car } from '../cars/Car';

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
