import { Button, Card, Modal, Row } from 'antd';
import React, { useState } from 'react';

import { EditFilled } from '@ant-design/icons';
import { ICarPhoto } from 'entities/car/lib/types';
import { CarPhotos } from './CarPhotos/CarPhotos';
import { CarPrice } from './CarPrice/CarPrice';
import { CarStatistic } from './CarStatistic/CarStatistic';
import { EditCommonCharacteristics } from './EditCommonCharacteristics';

interface IProps {
  carId: string;
  brand: string;
  model: string;
  owner: string;
  totalLikes: number;
  totalViews: number;
  todayLikes: number;
  todayViews: number;
  isExchanged: boolean;
  price: number;
  photos: ICarPhoto[];
}

export const CarCommonCharacteristics: React.FC<IProps> = ({
  carId,
  brand,
  model,
  owner,
  totalLikes,
  totalViews,
  todayLikes,
  todayViews,
  isExchanged,
  price,
  photos,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}
        title={`Привет ${owner}! Это твой ${brand} - ${model}`}
        bordered={false}
        style={{ width: '100%' }}
        extra={[
          <Button key="edit" onClick={() => setOpen(true)}>
            <EditFilled />
          </Button>,
        ]}
      >
        <Row gutter={[16, 16]} style={{ width: '100%' }}>
          <CarPhotos photos={photos} />
        </Row>

        <CarStatistic
          likes={totalLikes}
          views={totalViews}
          todayLikes={todayLikes}
          todayViews={todayViews}
        />
        <CarPrice isExchanged={isExchanged} price={price} />
      </Card>
      <Modal
        title={`Изменить данные ${brand} - ${model}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <EditCommonCharacteristics
          price={price}
          carId={carId}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};
