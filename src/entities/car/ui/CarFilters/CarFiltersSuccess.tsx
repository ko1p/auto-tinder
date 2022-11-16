import { Col, Row } from 'antd';

import { IGetFilter } from 'entities/car/lib/types';
import React from 'react';

interface IProps {
  filter: IGetFilter;
}

export const CarFiltersSuccess: React.FC<IProps> = ({ filter }) => (
  <Row gutter={[16, 16]} style={{ width: '100%' }}>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Города для обмена:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      {filter.city.map((city) => city.name).join(', ')}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Производители:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      {filter.brands.map((brand) => brand.name).join(', ')}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Модели:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      {filter.models.map((models) => models.name).join(', ')}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Кузовы:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      {filter.bodies.map((body) => body.name).join(', ')}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Коробки:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      {filter.gearboxes.map((gearbox) => gearbox.name).join(', ')}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Двигатели:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      {filter.engines.map((engine) => engine.name).join(', ')}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Приводы:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      {filter.drives.map((drive) => drive.name).join(', ')}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Год производства:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      от {filter.manufacturedAtStart} до {filter.manufacturedAtFinish}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Цена:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      от {filter.priceStart} до {filter.priceFinish}
    </Col>
    <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
      <h4>Пробег:</h4>
    </Col>
    <Col md={{ span: 18 }} sm={{ span: 14 }} xs={{ span: 24 }}>
      от {filter.mileageStart} до {filter.mileageFinish}
    </Col>
  </Row>
);
