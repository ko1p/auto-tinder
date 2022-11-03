import { CarFilled, SmileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { userSelector } from 'entities/user/model/state/authSelector';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { routing } from 'shared/routing';
import './Header.scss';

export const Header: FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector(userSelector);

  return (
    <header className="header">
      <div className="header__content">
        <CarFilled
          className="header__icons"
          onClick={() => navigate(routing.main)}
        />
        <div className="header__links">
          <Link to={routing.cars}>Машины</Link>
          <Link to={routing.coupons}>Купоны</Link>
        </div>
        <div className="header__decktop">
          {!user && <Button className="header__button">Вход</Button>}
          <Button className="header__button">{user || 'Регистрация'}</Button>
        </div>
        <div className="header__mobile">
          <SmileOutlined
            className="header__icons"
            onClick={() => navigate(routing.profile)}
          />
        </div>
      </div>
    </header>
  );
};
