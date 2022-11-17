import { Button, Card, Col, Row, Space, message } from 'antd';
import { EditFilled, LogoutOutlined } from '@ant-design/icons';
import { adminActivation, authAPI, logOut } from 'features/auth/model';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import React from 'react';
import { isAdminSelector } from 'entities/user/model/state/authSelector';
import { routing } from 'shared/routing';
import { useNavigate } from 'react-router';
import { IEditProfile } from '../../lib/types';

export const InfoProfile: React.FC<IEditProfile> = ({
  data,
  setIsEditOpen,
}) => {
  const [useLogOut, { isLoading }] = authAPI.useLogOutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAdmin = useAppSelector(isAdminSelector);
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

  const adminActivationHandler = () => {
    try {
      dispatch(adminActivation());
      message.info('Функции администратора активированы');
    } catch (error) {
      message.error('Функции администратора не активированы');
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
          {!isAdmin && data.authority === 'ADMIN' && (
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              span={24}
              onClick={adminActivationHandler}
            >
              <Button>Функция администратора</Button>
            </Col>
          )}
        </Row>
      </Card>
    </article>
  );
};
