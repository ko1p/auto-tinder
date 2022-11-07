import './Header.scss';

import { CarFilled, SmileOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { routing } from 'shared/routing';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { useNavigate } from 'react-router';
import { userAPI } from 'entities/user/model/query/userProfileService';
import { userSelector } from 'entities/user/model/state/authSelector';

export const Header: FC = () => {
  const navigate = useNavigate();

  const userId = useAppSelector(userSelector);
  const { data: user, isLoading } = userAPI.useUserProfileQuery(userId!);

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
              onClick={() => navigate(routing.signIn)}
            >
              Вход
            </Button>
          )}
          <Button
            className="header__button"
            onClick={() => navigate(routing.signUp)}
            loading={isLoading}
          >
            {user?.name || 'Регистрация'}
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
