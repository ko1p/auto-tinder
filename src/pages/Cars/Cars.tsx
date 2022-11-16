import { SettingFilled } from '@ant-design/icons';
import { Pagination } from 'antd';
import { ICar } from 'entities/car/lib/types';
import { userSelector } from 'entities/user/model/state/authSelector';
import { carsAPI } from 'features/allCars/model/carsServices';
import { CarsList } from 'features/allCars/ui/carsList/carsList';
import { garageAPI } from 'features/garage/model/query/garageService';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { deserializeQuery } from 'widgets/utils/Api';
import './Cars.scss';

export const Cars: FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const userId = useAppSelector(userSelector);
  const { data, isSuccess } = carsAPI.useGetAllCarsQuery(search);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(
    isSuccess ? data.size : 8
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (search) {
      const { page, size } = deserializeQuery(search);
      setCurrentPage(page);
      setCurrentSize(size);
    }
  }, [search]);

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
            defaultCurrent={currentPage}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} из ${total} машин`
            }
            defaultPageSize={currentSize}
            pageSizeOptions={[
              data!.pageable.pageSize / 2,
              data!.pageable.pageSize,
              data!.pageable.pageSize * 2,
            ]}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setCurrentSize(pageSize);
            }}
          />
        </div>
      )}
    </section>
  );
};
