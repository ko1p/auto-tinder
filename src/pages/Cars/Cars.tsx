import { SettingFilled } from '@ant-design/icons';
import { Select } from 'antd';
import { ICar } from 'entities/car/lib/types';
import { userSelector } from 'entities/user/model/state/authSelector';
import { carsAPI } from 'features/allCars/model/carsServices';
import { CarsList } from 'features/allCars/ui/carsList/carsList';
import { garageAPI } from 'features/garage/model/query/garageService';
import React, { FC, useState } from 'react';
import { useAppSelector } from 'shared/lib/hooks/redux';
import './Cars.scss';

export const Cars: FC = () => {
  const { data } = carsAPI.useGetAllCarsQuery('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userId = useAppSelector(userSelector);
  let exchangeCar: ICar | undefined;
  if (userId) {
    const { data: cars } = garageAPI.useUserCarsQuery(userId);
    exchangeCar = cars?.filter((car) => car.isExchanged)[0];
  }
  return (
    <section className="cars">
      <SettingFilled
        onClick={() => setIsOpen(!isOpen)}
        className="cars__icon"
      />
      <div
        className={`cars__filters
        ${isOpen ? `cars__filters_active` : ' '}`}
      >
        <p>фильтра</p>
      </div>
      <CarsList content={data?.content} exchangeId={exchangeCar?.id} />
      {/* <div className="cars__pagination">
          
      </div> */}
    </section>
  );
};
