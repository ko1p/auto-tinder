import './CarPrice.scss';

import React from 'react';
import { Space } from 'antd';

interface IProps {
  isExchanged: boolean;
  price: number;
}

export const CarPrice: React.FC<IProps> = ({ isExchanged, price }) => (
  <Space className="usercar-carprice">
    <span className="usercar-carprice__ex">
      {isExchanged ? 'Возможен обмен' : 'Обмен не ведется'}
    </span>
    <span className="usercar-carprice__price">
      Стоимость: <span className="usercar__price_accent">{price} ₽</span>
    </span>
  </Space>
);
