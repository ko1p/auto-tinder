import { couponsApi } from 'features/coupons/model/couponssServices';
import { CouponDetail } from 'features/coupons/ui/CouponDetail/CouponDetail';
import React, { FC } from 'react';
import { useParams } from 'react-router';

const СouponsDetailsPage: FC = () => {
  const { id } = useParams();
  const { data } = couponsApi.useGetCouponQuery(id);

  return data ? (
    <CouponDetail coupon={data} />
  ) : (
    <h2 className="coupon-details-page__text">
      Запрашиваемой вами купон не существует!!!
    </h2>
  );
};

export { СouponsDetailsPage };
