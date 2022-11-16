import { Button, Card, Col, Modal, Row } from 'antd';
import React, { useState } from 'react';

import { EditFilled } from '@ant-design/icons';
import { EditDescription } from './EditDescription';

interface IProps {
  brand: string;
  model: string;
  vinCode: string;
  stateNumber: string;
  manufacturedAt: number;
  mileage: number;
  description: string;
  totalOwners: number;
  carId: string;
}

const CarDescription: React.FC<IProps> = ({
  brand,
  model,
  vinCode,
  stateNumber,
  manufacturedAt,
  mileage,
  description,
  totalOwners,
  carId,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        title="Прочие данные"
        bordered={false}
        style={{ width: '100%' }}
        extra={
          <Button onClick={() => setOpen(true)}>
            <EditFilled />
          </Button>
        }
      >
        <Row gutter={[16, 16]} style={{ width: '100%' }}>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            VIN код:
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {vinCode}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            Гос. номер:
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {stateNumber}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            Год производства:
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {manufacturedAt}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            Пробег:
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {mileage}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            Количество владельцев:
          </Col>
          <Col md={{ span: 20 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {totalOwners}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            Подробное описание:
          </Col>
          <Col md={{ span: 20 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {description}
          </Col>
        </Row>
      </Card>

      <Modal
        title={`Изменить прочие данные ${brand} - ${model}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <EditDescription
          vinCode={vinCode}
          stateNumber={stateNumber}
          manufacturedAt={manufacturedAt}
          mileage={mileage}
          description={description}
          totalOwners={totalOwners}
          carId={carId}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};

export default CarDescription;
