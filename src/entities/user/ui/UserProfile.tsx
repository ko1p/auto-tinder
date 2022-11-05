import './UserProfile.scss';

import React, { useState } from 'react';

import { ButtonTinder } from 'shared/ui';
import { Descriptions } from 'antd';
import { useParams } from 'react-router';
import { EditProfile } from './EditProfile';
import { userAPI } from '../model/query/userProfileService';

const { Item } = Descriptions;

export const UserProfile = () => {
  const params = useParams();
  const { data, isLoading, isSuccess } = userAPI.useUserProfileQuery(
    params.userId!
  );
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  return (
    <>
      {isLoading && 'loading'}
      {isSuccess && (
        <section className="user-profile">
          <h2>{`Привет ${data.name}!`}</h2>
          <Descriptions
            bordered
            column={1}
            size="small"
            className="user-profile__table"
            title="Профиль"
            extra={
              <>
                <ButtonTinder
                  onClick={() => {
                    setIsEditOpen(true);
                  }}
                  theme="main"
                  type="primary"
                >
                  Редактировать
                </ButtonTinder>
                <EditProfile
                  data={data}
                  isEditOpen={isEditOpen}
                  setIsEditOpen={setIsEditOpen}
                />
              </>
            }
          >
            <Item className="user-profile__item" label="Ф.И.О.">
              {data.name}
            </Item>
            <Item className="user-profile__item" label="Телефон.:">
              {data.phone || 'Не указан'}
            </Item>
            <Item className="user-profile__item" label="Email">
              {data.email}
            </Item>
            <Item className="user-profile__item" label="Профиль">
              {data.isOnboarded ? 'Заполнен' : 'Незаполнен'}
            </Item>
          </Descriptions>
        </section>
      )}
    </>
  );
};
