import { Button, Descriptions, Form, Space } from 'antd';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { authAPI, logOut } from 'features/auth/model';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import React from 'react';
import { routing } from 'shared/routing';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { useNavigate } from 'react-router';
import { IEditProfile } from '../../lib/types';

const { Item } = Form;

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
      <Descriptions
        bordered
        layout="vertical"
        column={{ xs: 2, sm: 2, md: 4 }}
        size="small"
        className="user-profile__table"
        title={title}
        extra={
          <ButtonTinder
            onClick={() => {
              setIsEditOpen(true);
            }}
            theme="main"
            type="link"
            loading={isLoading}
          >
            Редактировать <EditOutlined />
          </ButtonTinder>
        }
      >
        <Item className="user-profile__item" label="Имя">
          {data.name}
        </Item>
        <Item className="user-profile__item" label="Телефон.:">
          {data?.phone?.replace(
            /^(\d{3})(\d{3})(\d{2})(\d{2})/,
            '+7 ($1) $2-$3-$4'
          ) || 'Не указан'}
        </Item>
        <Item className="user-profile__item" label="Email">
          {data.email}
        </Item>
        <Item className="user-profile__item" label="Профиль">
          {data.isOnboarded ? 'Заполнен' : 'Незаполнен'}
        </Item>
      </Descriptions>
    </article>
  );
};
