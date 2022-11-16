import './couponsList.scss';

import React, { FC } from 'react';
import { TCoupons } from 'features/coupons/lib/types';
import { Coupon } from '../Coupon/coupon';

const CouponsList: FC<{
  content: Array<TCoupons> | undefined;
}> = ({ content }) => (
  <ul className="coupons-list">
    {content?.map((element) => (
      <li key={element.id}>
        <Coupon coupon={element} />
      </li>
    ))}
  </ul>
);

export { CouponsList };
