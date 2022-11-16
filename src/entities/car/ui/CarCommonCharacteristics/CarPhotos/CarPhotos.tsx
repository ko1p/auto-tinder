import { Col, Image } from 'antd';

import { ICarPhoto } from 'entities/car/lib/types';
import React from 'react';

interface IProps {
  photos: ICarPhoto[];
}

export const CarPhotos: React.FC<IProps> = ({ photos }) => (
  <>
    {photos.map((photo) => (
      <Col
        style={{ display: 'flex', alignItems: 'center', width: '100%' }}
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
