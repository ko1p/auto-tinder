import React, { FC } from 'react';
import { TCar } from 'features/allCars/lib';
import { Button, Carousel } from 'antd';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useChoicePreference } from 'features/allCars/model/carsHooks';
import imageCar from '../../../../shared/assets/images/pngwing.com.png';
import './CarDetails.scss';

const CarDetails: FC<{ car: TCar; exchangeId?: number }> = ({
  car,
  exchangeId,
}) => {
  let image: Array<string>;
  if (car.photos.length === 0) {
    image = [imageCar];
  } else {
    image = car.photos.map((photo) =>
      photo.photoLink ? `${photo.photoLink}?alt=media` : imageCar
    );
  }

  const { changeLike, changeDislike } = useChoicePreference(car.id, exchangeId);

  return (
    <section className="car-details">
      <div className="car-details__image-box">
        <Carousel
          autoplay
          className="car-details__carousel"
          style={{ width: '100%', height: 'auto' }}
        >
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
