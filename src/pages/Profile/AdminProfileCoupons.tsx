import { Pagination, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { pageSizeOptionsBase, paginationSizeBase } from 'widgets/utils/contant';
import { useLocation, useNavigate } from 'react-router';

import { AdminCouponAdd } from 'features/admin/ui/AdminCouponAdd';
import { CouponsList } from 'features/coupons/ui/couponsList/couponsList';
import { couponsApi } from 'features/coupons/model/couponssServices';

export const AdminProfileCoupons = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { data, isSuccess } = couponsApi.useGetAllCuponsQuery(search);

  const [currentPage, setCurrentPage] = useState<number>(
    isSuccess ? data.pageable.pageNumber : 0
  );
  const [currentSize, setCurrentSize] = useState<number>(
    isSuccess ? data.size : paginationSizeBase
  );

  useEffect(() => {
    if (
      search ||
      currentPage !== 1 ||
      currentSize !== data?.pageable.pageSize
    ) {
      navigate(`?page=${currentPage}&size=${currentSize}`);
    }
  }, [currentPage, currentSize]);

  return (
    <section className="coupons">
      <Space
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <AdminCouponAdd />
      </Space>
      <CouponsList content={data?.content} />
      {isSuccess && (
        <div className="coupons__pagination">
          <Pagination
            total={data?.totalElements}
            defaultCurrent={currentPage + 1}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} из ${total} купонов`
            }
            defaultPageSize={currentSize}
            showSizeChanger
            pageSizeOptions={pageSizeOptionsBase}
            onChange={(page, pageSize) => {
              setCurrentPage(page - 1);
              setCurrentSize(pageSize);
            }}
          />
        </div>
      )}
    </section>
  );
};
