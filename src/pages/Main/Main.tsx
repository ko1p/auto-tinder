import { Button } from 'antd';
import { carsAPI } from 'features/allCars/model/carsServices';
import { CarsList } from 'features/allCars/ui/carsList/carsList';
import React, { FC, useState } from 'react';
import image from '../../shared/assets/images/bg.webp';
import './Main.scss';

export const Main: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const avto = document.querySelector('.main-section__stucture_avto');
  const cupons = document.querySelector('.main-section__stucture_cupons');
  const avtoBtn = document.querySelector('.main-section__button_cars');
  const cuponsBtn = document.querySelector('.main-section__button_cupons');

  if (isActive) {
    avto?.classList.remove('main-section__stucture_active');
    cupons?.classList.add('main-section__stucture_active');
    avtoBtn?.classList.remove('main-section__button_active');
    cuponsBtn?.classList.add('main-section__button_active');
  } else {
    avto?.classList.add('main-section__stucture_active');
    cupons?.classList.remove('main-section__stucture_active');
    avtoBtn?.classList.add('main-section__button_active');
    cuponsBtn?.classList.remove('main-section__button_active');
  }

  const { data } = carsAPI.useGetTopCarsQuery('');

  return (
    <section className="main-section">
      <div className="main-section__box">
        <div className="main-section__text-box">
          <h1 className="main-section__title">AutoTinder</h1>
          <p className="main-section__text">- исследуй автомир вместе с нами</p>
          <p className="main-section__text">
            - AutoTinder поможет тебе найти машину, которую хотелось бы взять в
            аренду или обменять, покупать купоны на скидки или даже
            познакомиться c новыми людьми. Попробуй!
          </p>
        </div>
        <img
          src={image}
          alt="Главное изображение сервиса"
          className="main-section__image"
        />
      </div>
      <div className="main-section__mobile-tab">
        <Button
          htmlType="button"
          type="text"
          className="main-section__button main-section__button_cars main-section__button_active"
          onClick={() => setIsActive(false)}
        >
          Машины
        </Button>
        <Button
          htmlType="button"
          type="text"
          className="main-section__button main-section__button_cupons"
          onClick={() => setIsActive(true)}
        >
          Купоны
        </Button>
      </div>
      <section className="main-section__stucture main-section__stucture_avto main-section__stucture_active">
        <CarsList content={data?.content} />
      </section>
      <section className="main-section__stucture main-section__stucture_cupons">
        <div>Тут будут купоны</div>
      </section>
    </section>
  );
};
