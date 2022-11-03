import { CarFilled } from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { routing } from 'shared/routing';
import './Footer.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__title">
          <CarFilled className="footer__icon" />
          <p className="footer__date">2022 - {year}</p>
        </div>
        <ul className="footer__info-box">
          <li>
            <NavLink to={routing.privacy}>Пользовательское соглашение</NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};
