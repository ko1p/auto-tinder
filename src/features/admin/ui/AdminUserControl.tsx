import { Button, Card, Col, Row } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import React from 'react';
import { title } from 'process';
import { userAPI } from 'entities/user/model/query/userProfileService';
import { adminAPI } from '../model/AdminService';

interface IProps {
  userId: string;
  carId: string;
}

export const AdminUserControl: React.FC<IProps> = ({ userId, carId }) => {
  const { data: user, isSuccess: isUserSuccess } =
    userAPI.useUserProfileQuery(userId);
  const [banUser, { isLoading: isUserBanLoading }] =
    adminAPI.useUserBanMutation();
  const [banCar, { isLoading: isUserCarLoading }] =
    adminAPI.useUserBanMutation();

  const banUserHandler = async () => {
    try {
      await banUser(userId).unwrap();
    } catch (e) {
      ApiError(e as IError);
    }
  };
  const banCarHandler = async () => {
    try {
      await banCar(carId).unwrap();
    } catch (e) {
      ApiError(e as IError);
    }
  };

  if (isUserSuccess)
    return (
      <article>
        <Card title={title} bordered={false} style={{ width: '100%' }}>
          <Row gutter={[16, 16]} style={{ width: '100%' }}>
            <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
              <h4>Имя:</h4>
            </Col>
            <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
              {user.name}
            </Col>
            <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
              <h4>Телефон:</h4>
            </Col>
            <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
              {user?.phone?.replace(
                /^(\d{3})(\d{3})(\d{2})(\d{2})/,
                '+7 ($1) $2-$3-$4'
              ) || 'Не указан'}
            </Col>
            <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
              <h4>Email:</h4>
            </Col>
            <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
              {user.email}
            </Col>
            <Col md={{ span: 4 }} sm={{ span: 10 }} xs={{ span: 24 }}>
              <h4>Профиль:</h4>
            </Col>
            <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
              {!user.hasPhone && <h5>Телефон не указан</h5>}
              {!user.hasCar && <h5>Нет автомобиля в гараже</h5>}
              {!user.hasCarPreferece && <h5>Нет предпочтений на обмен</h5>}
            </Col>
            <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
              <Button onClick={banUserHandler} loading={isUserBanLoading}>
                Забанить Пользователя
              </Button>
            </Col>
            <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
              <Button onClick={banCarHandler} loading={isUserCarLoading}>
                Забанить Авто
              </Button>
            </Col>
          </Row>
        </Card>
      </article>
    );

  return <span>Загрузка</span>;
};
