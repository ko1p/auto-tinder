import { Button } from 'antd';
import { ICar } from 'entities/car/lib/types';
import { userSelector } from 'entities/user/model/state/authSelector';
import { carsAPI } from 'features/allCars/model/carsServices';
import { CarsList } from 'features/allCars/ui/carsList/carsList';
import { garageAPI } from 'features/garage/model/query/garageService';
import React, { FC, useState } from 'react';
import { useAppSelector } from 'shared/lib/hooks/redux';
import image from '../../shared/assets/images/bg.webp';
import './Main.scss';

export const Main: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const { data } = carsAPI.useGetTopCarsQuery('');
  const userId = useAppSelector(userSelector);

  let exchangeCar: ICar | undefined;
  if (userId) {
    const { data: cars } = garageAPI.useUserCarsQuery(userId);
    exchangeCar = cars?.filter((car) => car.isExchanged)[0];
  }

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
          className={`main-section__button 
            ${isActive ? ' ' : 'main-section__button_active'}`}
          onClick={() => setIsActive(false)}
        >
          Машины
        </Button>
        <Button
          htmlType="button"
          type="text"
          className={`main-section__button 
            ${isActive ? 'main-section__button_active' : ' '}`}
          onClick={() => setIsActive(true)}
        >
          Купоны
        </Button>
      </div>
      <section
        className={`main-section__stucture 
        ${isActive ? ' ' : 'main-section__stucture_active'}`}
      >
        <CarsList content={data?.content} exchangeId={exchangeCar?.id} />
      </section>
      <section
        className={`main-section__stucture 
        ${isActive ? 'main-section__stucture_active' : ' '}`}
      >
        <div>Тут будут купоны</div>
      </section>
    </section>
  );
};
