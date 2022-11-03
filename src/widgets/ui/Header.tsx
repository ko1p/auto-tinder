import { CarFilled, SmileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { userSelector } from 'entities/user/model/state/authSelector';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
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
          <NavLink to={routing.cars}>Машины</NavLink>
          <NavLink to={routing.coupons}>Купоны</NavLink>
        </div>
        <div className="header__decktop">
          {!user && (
            <Button
              className="header__button"
              onClick={() => navigate(routing.signUp)}
            >
              Вход
            </Button>
          )}
          <Button
            className="header__button"
            onClick={() => navigate(routing.signIn)}
          >
            {user || 'Регистрация'}
          </Button>
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
