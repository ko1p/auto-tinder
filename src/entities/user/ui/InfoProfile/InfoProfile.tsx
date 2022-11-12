import { ButtonTinder, InputTinder, PasswordTinder } from 'shared/ui';
import { Descriptions, Form, Modal, message } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { IEditProfile } from '../../lib/types';
import { IError } from 'shared/lib/types';
import React from 'react';
import { useParams } from 'react-router';
import { userAPI } from '../../model/query/userProfileService';

const { Item } = Form;

export const InfoProfile: React.FC<IEditProfile> = ({
  data,
  isEditOpen,
  setIsEditOpen,
}) => (
  <article>
    <h2>{`Привет ${data.name}!`}</h2>
    <Descriptions
      bordered
      layout="vertical"
      column={{ xs: 2, sm: 2, md: 4 }}
      size="small"
      className="user-profile__table"
      title="Профиль"
      extra={
        <ButtonTinder
          onClick={() => {
            setIsEditOpen(true);
          }}
          theme="main"
          type="primary"
        >
          Редактировать
        </ButtonTinder>
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
  </article>
);
