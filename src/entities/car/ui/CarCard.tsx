import { Card } from 'antd';
import React from 'react';
import { ICar } from '../lib/types';

const { Meta } = Card;

interface IProps {
  car: ICar;
  // type?: 'public' | 'garage';
}

export const CarCard: React.FC<IProps> = ({
  car: { brand, model, price, photos },
}) => (
  <Card
    style={{ width: '100%', height: '100%' }}
    cover={<img src={`${photos[0]?.photoLink}?alt=media`} alt="" />}
  >
    <Meta title={`${brand.name} - ${model.name}`} description={price} />
  </Card>
);
