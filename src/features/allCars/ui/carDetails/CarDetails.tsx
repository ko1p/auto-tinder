import React, { FC } from 'react';
import { TCar } from 'features/allCars/lib';
import { Button, Carousel } from 'antd';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import imageCar from '../../../../shared/assets/images/bg.webp';
import './CarDetails.scss';
import { carsAPI } from '../../model/carsServices';

const CarDetails: FC<{ car: TCar }> = ({ car }) => {
  const image = car.photos.map((photo) =>
    photo.photoLink ? `${photo.photoLink}?alt=media` : imageCar
  );

  const changeLike = () => {
    carsAPI.useToLikeQuery(car.id);
  };

  const changeDislike = () => {
    carsAPI.useToDislikeQuery(car.id);
  };
  return (
    <section className="car-details">
      <div className="car-details__image-box">
        <Carousel autoplay>
          {image.map((element, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <img src={element} alt="Фотография машины" key={index} />
          ))}
        </Carousel>
      </div>
      <div className="car-details__title-box">
        <h2 className="car-details__title">
          {car.brand.name} {car.model.name}
        </h2>
        <h3 className="car-details__price">{car.price} рублей</h3>
        <p className="car-details__text">
          <span className="car-details__span">Пробег: </span>
          {car.mileage}
        </p>
        <p className="car-details__text">
          <span className="car-details__span">Город: </span>
          {car.city.name}
        </p>
        <p className="car-details__text">
          <span className="car-details__span">Кузов: </span>
          {car.body.name}
        </p>
        <p className="car-details__text">
          <span className="car-details__span">Двигатель: </span>
          {car.engine.name}
        </p>
        <p className="car-details__text">
          <span className="car-details__span">Привод: </span>
          {car.drive.name}
        </p>
        <p className="car-details__text">
          <span className="car-details__span">Коробка: </span>
          {car.gearbox.name}
        </p>
        <p className="car-details__text">
          <span className="car-details__span">Всего просмотров: </span>
          {car.totalViews} (<span className="car-details__span">сегодня: </span>
          {car.todayViews})
        </p>
        <p className="car-details__text">
          <span className="car-details__span">Всего лайков: </span>
          {car.totalLikes} (<span className="car-details__span">сегодня: </span>
          {car.todayLikes})
        </p>
        <div className="car-details__buttons">
          <Button
            htmlType="button"
            className="car-details__button"
            onClick={changeLike}
          >
            <LikeFilled />
          </Button>
          <Button
            htmlType="button"
            className="car-details__button"
            onClick={changeDislike}
          >
            <DislikeFilled />
          </Button>
        </div>
      </div>
      <div className="car-details__description">
        <p className="car-details__text">
          <span className="car-details__span">Описание: </span>
          <br />
          {car.description}
        </p>
      </div>
    </section>
  );
};

export { CarDetails };
