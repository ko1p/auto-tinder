import { CarFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { userSelector } from 'entities/user/model/state/authSelector';
import { TCoupons } from 'features/coupons/lib/types';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { routing } from 'shared/routing';
import './CouponDetail.scss';

const CouponDetail: FC<{ coupon: TCoupons }> = ({ coupon }) => {
  const userId = useAppSelector(userSelector);
  const navigate = useNavigate();
  const getIt = () => {
    if (userId) {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const isChange = confirm('Вы забираете этот купон!!!');
      if (isChange) {
        console.log('вы забрали купон');
      }
    } else {
      navigate(routing.signIn);
    }
  };
  console.log(coupon);
  return (
    <section className="coupon-datail">
      <div className="coupon-datail__image-box">
        {coupon.photoLink ? (
          <img
            src={`${coupon.photoLink}?alt=media`}
            alt="Изображение купона"
            className="coupon-datail__image"
          />
        ) : (
          <CarFilled className="coupon-datail__icon" />
        )}
      </div>
      <div className="coupon-datail__data">
        <h2 className="coupon-datail__title">{coupon.title}</h2>
        <h3 className="coupon-datail__owner">
          <span className="coupon-datail__span">Исполнитель: </span>
          {coupon.companyOwner}
        </h3>
        <p className="coupon-datail__text">
          <span className="coupon-datail__span">Цена: </span>
          {coupon.price ? `${coupon.price} рублей` : 'Безвозмездно'}
        </p>
        <p className="coupon-datail__text">
          <span className="coupon-datail__span">Сроки: </span> c{' '}
          {coupon.startDate} по {coupon.endDate}
        </p>
        <Button
          htmlType="button"
          onClick={getIt}
          className="coupon-datail__button"
        >
          Забрать купон
        </Button>
      </div>
      <p className="coupon-datail__description">
        <span className="coupon-datail__span">Подробности:</span> <br />
        {coupon.description}
      </p>
    </section>
  );
};

export { CouponDetail };
