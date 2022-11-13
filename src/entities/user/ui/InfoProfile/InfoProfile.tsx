import { Descriptions, Form } from 'antd';

import { ButtonTinder } from 'shared/ui';
import React from 'react';
import { IEditProfile } from '../../lib/types';

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
      <Item className="user-profile__item" label="Имя">
        {data.name}
      </Item>
      <Item className="user-profile__item" label="Телефон.:">
        {data.phone.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4') ||
          'Не указан'}
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
