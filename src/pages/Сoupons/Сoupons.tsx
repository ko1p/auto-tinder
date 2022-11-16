import { Pagination } from 'antd';
import { couponsApi } from 'features/coupons/model/couponssServices';
import { CouponsList } from 'features/coupons/ui/couponsList/couponsList';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { deserializeQuery } from 'widgets/utils/Api';
import { pageSizeOptionsBase, paginationSizeBase } from 'widgets/utils/contant';
import './Coupons.scss';

export const Coupons: FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { data, isSuccess } = couponsApi.useGetAllCuponsQuery(search);

  const [currentPage, setCurrentPage] = useState<number>(0);
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

  useEffect(() => {
    if (search) {
      const { page, size } = deserializeQuery(search);
      setCurrentPage(page);
      setCurrentSize(size);
    }
  }, [search]);

  return (
    <section className="coupons">
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
