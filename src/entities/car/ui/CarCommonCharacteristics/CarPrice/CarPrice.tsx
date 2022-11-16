import './CarPrice.scss';

import React from 'react';
import { Space } from 'antd';

interface IProps {
  isExchanged: boolean;
  price: number;
}

export const CarPrice: React.FC<IProps> = ({ isExchanged, price }) => (
  <Space className="usercar-carprice">
    <h3 className="usercar-carprice__ex">
      {isExchanged ? 'Возможен обмен' : 'Обмен не ведется'}
    </h3>
    <div className="usercar-carprice__price">
      <h4 className="usercar-carprice__text">Стоимость: {price} ₽</h4>
    </div>
  </Space>
);
