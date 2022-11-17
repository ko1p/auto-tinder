import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import { TCar } from 'features/allCars/lib';
import React, { FC } from 'react';
import { userSelector } from 'entities/user/model/state/authSelector';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { useChoicePreference } from 'features/allCars/model/carsHooks';
import imageCar from '../../../../shared/assets/images/pngwing.com.png';
import { routing } from '../../../../shared/routing';
import './Car.scss';

export const Car: FC<{ car: TCar; exchangeId?: number }> = ({
  car,
  exchangeId,
}) => {
  const navigate = useNavigate();
  const id = useAppSelector(userSelector);
  const image = car.photos[0]
    ? `${car.photos[0].photoLink}?alt=media`
    : imageCar;

  const { changeLike, changeDislike } = useChoicePreference(car.id, exchangeId);

  const goToDetails = () => {
    if (id) {
      navigate(routing.navCarDetail(car.id));
    } else {
      navigate(routing.signIn);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article className="car" onClick={goToDetails}>
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
