import './CarCard.scss';

import React from 'react';
import { ICar } from '../lib/types';

interface IProps {
  car: ICar;
  // type?: 'public' | 'garage';
}

export const CarCard: React.FC<IProps> = ({ car }) => (
  <section className="car-card">
    <img
      className="car-card__image"
      src={`${car.photos[0]?.photoLink}?alt=media`}
      alt=""
    />
    <article className="car-card__info">
      <h3 className="car-card__brand">{car.brand?.name}</h3>
      <h4 className="car-card__model">{car.model?.name}</h4>
      <h2 className="car-card__price">{car?.price}</h2>
    </article>
  </section>
);
