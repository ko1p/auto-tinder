import { Card } from 'antd';
import React from 'react';
import { routing } from 'shared/routing';
import { useNavigate } from 'react-router-dom';
import { ICar } from '../lib/types';

const { Meta } = Card;

interface IProps {
  car: ICar;
  // type?: 'public' | 'garage';
}

export const CarCard: React.FC<IProps> = ({
  car: { id, brand, model, price, photos },
}) => {
  const navigate = useNavigate();
  const openCarInfo = () => {
    navigate(routing.navUserCar(`${id}`));
  };

  return (
    <Card
      onClick={openCarInfo}
      style={{ width: '100%', height: '100%' }}
      cover={<img src={`${photos[0]?.photoLink}?alt=media`} alt="" />}
    >
      <Meta
        title={`${brand.name} - ${model.name}`}
        description={`Стоимость: ${price} ₽`}
      />
    </Card>
  );
};
