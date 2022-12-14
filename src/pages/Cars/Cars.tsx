// import { SettingFilled } from '@ant-design/icons';
import { Pagination } from 'antd';
import { ICar } from 'entities/car/lib/types';
import { userSelector } from 'entities/user/model/state/authSelector';
import { carsAPI } from 'features/allCars/model/carsServices';
import { CarsList } from 'features/allCars/ui/carsList/carsList';
import { garageAPI } from 'features/garage/model/query/garageService';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { pageSizeOptionsBase, paginationSizeBase } from 'widgets/utils/contant';
import './Cars.scss';

export const Cars: FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const userId = useAppSelector(userSelector);
  const { data, isSuccess } = carsAPI.useGetAllCarsQuery(search);
  const [currentPage, setCurrentPage] = useState<number>(
    isSuccess ? data.pageable.pageNumber : 0
  );
  const [currentSize, setCurrentSize] = useState<number>(
    isSuccess ? data.size : paginationSizeBase
  );

  // const [isOpen, setIsOpen] = useState<boolean>(false);

  let exchangeCar: ICar | undefined;
  if (userId) {
    const { data: cars } = garageAPI.useUserCarsQuery(userId);
    exchangeCar = cars?.filter((car) => car.isExchanged)[0];
  }

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
    <section className="cars">
      {/* <SettingFilled
        onClick={() => setIsOpen(!isOpen)}
        className="cars__icon"
      />
      <div
        className={`cars__filters
        ${isOpen ? `cars__filters_active` : ' '}`}
      >
        <p>фильтра</p>
      </div> */}
      <CarsList content={data?.content} exchangeId={exchangeCar?.id} />
      {isSuccess && (
        <div className="cars__pagination">
          <Pagination
            total={data?.totalElements}
            defaultCurrent={currentPage + 1}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} из ${total} машин`
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
