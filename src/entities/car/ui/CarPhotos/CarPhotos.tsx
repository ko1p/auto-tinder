import { Col, Image } from 'antd';

import { ICar } from 'entities/car/lib/types';
import React from 'react';

interface IProps {
  car: ICar;
}

export const CarPhotos: React.FC<IProps> = ({ car }) => (
  <>
    {car.photos.map((photo) => (
      <Col
        style={{ display: 'flex', alignItems: 'center' }}
        key={photo.id}
        md={{ span: 8 }}
        sm={{ span: 12 }}
        xs={{ span: 24 }}
      >
        <Image width="100%" src={`${photo?.photoLink}?alt=media`} />
      </Col>
    ))}
  </>
);
