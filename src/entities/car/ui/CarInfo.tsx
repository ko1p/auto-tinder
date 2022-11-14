import './CarInfo.scss';

import { Button, Row, UploadFile } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import { RcFile } from 'antd/lib/upload';
import { CarImageUpload } from './CarImageUpload/CarImageUpload';
import { CarPhotos } from './CarPhotos/CarPhotos';
import { CarPrice } from './CarPrice/CarPrice';
import { CarStatistic } from './CarStatistic/CarStatistic';
import { carAPI } from '../model/CarService';

interface IProps {
  carId: string;
}

export const CarInfo: React.FC<IProps> = ({ carId }) => {
  const { data: car, isLoading, isSuccess } = carAPI.useUserCarInfoQuery(carId);
  const [addPhoto, { isLoading: isAddPhotoLoading }] =
    carAPI.useAddPhotoMutation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const addChanges = async () => {
    try {
      const photos = new FormData();

      if (fileList.length)
        fileList.forEach((file) => {
          photos.append('imagesUrl', file.originFileObj as RcFile);
        });
      await addPhoto({ carId: +carId, data: photos }).unwrap();
      setFileList([]);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  if (isLoading) return <span>Загрузка...</span>;

  if (isSuccess)
    return (
      <article className="usercar__info">
        <Row gutter={[16, 16]}>
          <CarPhotos car={car} />
        </Row>
        <CarImageUpload fileList={fileList} setFileList={setFileList} />
        <CarStatistic
          likes={car.totalLikes}
          views={car.totalViews}
          todayLikes={car.todayLikes}
          todayViews={car.todayViews}
        />
        <CarPrice isExchanged={car.isExchanged} price={car.price} />
        <Button loading={isAddPhotoLoading} onClick={addChanges}>
          Изменить
        </Button>
      </article>
    );

  return <span>Скелетон</span>;
};
