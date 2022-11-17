import { CarFilled } from '@ant-design/icons';
import { TCoupons } from 'features/coupons/lib/types';
import './coupon.scss';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { routing } from 'shared/routing';

const Coupon: FC<{ coupon: TCoupons }> = ({ coupon }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(routing.navCouponsDetail(coupon.id));
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article className="coupon" onClick={goToDetails}>
      <div className="coupon__image-box">
        {coupon.photoLink ? (
          <img
            src={`${coupon.photoLink}?alt=media`}
            alt="Изображение купона"
            className="coupon__image"
          />
        ) : (
          <CarFilled className="coupon__icon" />
        )}
      </div>
      <div className="coupon__data">
        <h4 className="coupon__title">{coupon.title}</h4>
        <h5 className="coupon__owner">{coupon.companyOwner}</h5>
        <p className="coupon__text">
          <span className="coupon__span">Цена: </span>
          {coupon.price ? `${coupon.price} рублей` : 'Безвозмездно'}
        </p>
        <p className="coupon__text">
          <span className="coupon__span">купон действует до </span>
          {coupon.endDate}
        </p>
      </div>
    </article>
  );
};

export { Coupon };
