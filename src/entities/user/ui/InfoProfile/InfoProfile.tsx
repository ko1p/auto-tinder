import { Button, Card, Col, Row, Space } from 'antd';
import { EditFilled, LogoutOutlined } from '@ant-design/icons';
import { authAPI, logOut } from 'features/auth/model';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import React from 'react';
import { routing } from 'shared/routing';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { useNavigate } from 'react-router';
import { IEditProfile } from '../../lib/types';

export const InfoProfile: React.FC<IEditProfile> = ({
  data,
  setIsEditOpen,
}) => {
  const [useLogOut, { isLoading }] = authAPI.useLogOutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const exit = async () => {
    try {
      await useLogOut('').unwrap();
      console.log('logOut');
      dispatch(logOut());
      navigate(routing.signIn);
    } catch (err) {
      ApiError(err as IError);
    }
  };

  const title = (
    <Space style={{ display: 'flex', alignItems: 'center' }}>
      <h2>{`Привет ${data.name}!`}</h2>
      <Button
        onClick={exit}
        type="primary"
        shape="circle"
        loading={isLoading}
        icon={<LogoutOutlined />}
      />
    </Space>
  );
  return (
    <article>
      <Card
        title={title}
        bordered={false}
        style={{ width: '100%' }}
        extra={
          <Button
            onClick={() => {
              setIsEditOpen(true);
            }}
            loading={isLoading}
          >
            <EditFilled />
          </Button>
        }
      >
        <Row gutter={[16, 16]} style={{ width: '100%' }}>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <h4>Имя:</h4>
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {data.name}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <h4>Телефон:</h4>
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {data?.phone?.replace(
              /^(\d{3})(\d{3})(\d{2})(\d{2})/,
              '+7 ($1) $2-$3-$4'
            ) || 'Не указан'}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <h4>Email:</h4>
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {data.email}
          </Col>
          <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <h4>Профиль:</h4>
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            {!data.hasPhone ? (
              <h5>Заполните телефон</h5>
            ) : !data.hasCar ? (
              <h5>Добавьте автомобиль в гараж</h5>
            ) : (
              !data.hasCarPreferece && <h5>Добавьте предпочтения в гараже</h5>
            )}
          </Col>
        </Row>
      </Card>
    </article>
  );
};
