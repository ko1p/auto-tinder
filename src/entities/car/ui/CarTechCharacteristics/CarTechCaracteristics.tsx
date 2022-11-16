import { Card, Col, Row, Switch } from 'antd';
import { EditFilled, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

import { ICarProperty } from 'entities/car/lib/types';
import { CarTechCaracteristicsBodies } from './Bodies/Bodies';
import { CarTechCaracteristicsDrives } from './Drives/Drives';
import { CarTechCaracteristicsEngines } from './Engines/Engines';
import { CarTechCaracteristicsGearboxes } from './Gearboxes/Gearboxes';

interface IProps {
  body: ICarProperty;
  drive: ICarProperty;
  engine: ICarProperty;
  gearbox: ICarProperty;
  carId: string;
}

export const CarTechCaracteristics: React.FC<IProps> = ({
  carId,
  body,
  drive,
  engine,
  gearbox,
}) => {
  const [isChangeable, setIsChangeable] = useState<boolean>(false);

  return (
    <Card
      title="Технические характеристики"
      bordered={false}
      style={{ width: '100%' }}
      extra={
        <Switch
          onChange={(e) => setIsChangeable(e)}
          checkedChildren={<EditFilled />}
          unCheckedChildren={<EditOutlined />}
        />
      }
    >
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        <Col md={{ span: 4 }} sm={{ span: 5 }} xs={{ span: 24 }}>
          <h3>Кузов:</h3>
        </Col>
        <Col
          style={{ overflow: 'auto' }}
          md={{ span: 20 }}
          sm={{ span: 19 }}
          xs={{ span: 24 }}
        >
          <CarTechCaracteristicsBodies
            body={body}
            carId={carId}
            isChangeable={isChangeable}
          />
        </Col>
        <Col md={{ span: 4 }} sm={{ span: 5 }} xs={{ span: 24 }}>
          <h3>Привод:</h3>
        </Col>
        <Col
          style={{ overflow: 'auto' }}
          md={{ span: 20 }}
          sm={{ span: 19 }}
          xs={{ span: 24 }}
        >
          <CarTechCaracteristicsDrives
            drive={drive}
            carId={carId}
            isChangeable={isChangeable}
          />
        </Col>
        <Col md={{ span: 4 }} sm={{ span: 5 }} xs={{ span: 24 }}>
          <h3>Топливо:</h3>
        </Col>
        <Col
          style={{ overflow: 'auto' }}
          md={{ span: 20 }}
          sm={{ span: 19 }}
          xs={{ span: 24 }}
        >
          <CarTechCaracteristicsEngines
            engine={engine}
            carId={carId}
            isChangeable={isChangeable}
          />
        </Col>
        <Col md={{ span: 4 }} sm={{ span: 5 }} xs={{ span: 24 }}>
          <h3>Коробка:</h3>
        </Col>
        <Col
          style={{ overflow: 'auto' }}
          md={{ span: 20 }}
          sm={{ span: 19 }}
          xs={{ span: 24 }}
        >
          <CarTechCaracteristicsGearboxes
            gearbox={gearbox}
            carId={carId}
            isChangeable={isChangeable}
          />
        </Col>
      </Row>
    </Card>
  );
};
