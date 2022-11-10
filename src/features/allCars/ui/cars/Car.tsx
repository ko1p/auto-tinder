import { Button } from 'antd';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import { TCar } from 'features/allCars/lib';
import React, { FC } from 'react';
import imageCar from '../../../../shared/assets/images/bg.webp';
import './Car.scss';
import { carsAPI } from '../../model/carsServices';

export const Car: FC<{ car: TCar }> = ({ car }) => {
  const image = car.photos[0]
    ? `${car.photos[0].photoLink}?alt=media`
    : imageCar;

  const changeLike = () => {
    carsAPI.useToLikeQuery(car.id);
  };

  const changeDislike = () => {
    carsAPI.useToDislikeQuery(car.id);
  };

  return (
    <article className="car">
      <div className="car__image-box">
        <img src={image} alt="Изображение автомобиля" className="car__image" />
      </div>
      <div className="car__title-box">
        <h5 className="car__title">
          {car.brand.name} {car.model.name}
        </h5>
        <p className="car__text">
          <span className="car__span">Цена: </span>
          {car.price} рублей
        </p>
        <p className="car__text">
          <span className="car__span">Пробег: </span>
          {car.mileage} км
        </p>
        <p className="car__text">
          <span className="car__span">Производство: </span>
          {car.manufacturedAt} год
        </p>
      </div>
      <div className="car__buttons">
        <Button htmlType="button" className="car__button" onClick={changeLike}>
          <LikeFilled />
        </Button>
        <Button
          htmlType="button"
          className="car__button"
          onClick={changeDislike}
        >
          <DislikeFilled />
        </Button>
      </div>
    </article>
  );
};
