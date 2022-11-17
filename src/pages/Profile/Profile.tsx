import './Profile.scss';

import {
  CarOutlined,
  ControlOutlined,
  LikeOutlined,
  ProfileOutlined,
  SwapOutlined,
} from '@ant-design/icons';

import { Garage } from 'features/garage/ui/Garage';
import React from 'react';
import { TabsTinder } from 'shared/ui/TabsTinder/TabsTinder';
import { UserProfile } from 'entities/user/ui/UserProfile';
import { isAdminSelector } from 'entities/user/model/state/authSelector';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { AdminProfileCoupons } from './AdminProfileCoupons';

export const Profile = () => {
  const isAdmin = useAppSelector(isAdminSelector);
  const items = [
    {
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ProfileOutlined />
          Профиль
        </span>
      ),
      key: 'item-1',
      children: (
        <article className="tabs__item">
          <UserProfile />
        </article>
      ),
    },
    {
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CarOutlined />
          Гараж
        </span>
      ),
      key: 'item-2',
      children: (
        <article className="tabs__item">
          <Garage />
        </article>
      ),
    },
    {
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SwapOutlined />
          Совпадения
        </span>
      ),
      key: 'item-3',
      disabled: true,
      children: (
        <article className="tabs__item">
          <Garage />
        </article>
      ),
    },
    {
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LikeOutlined />
          Нравимся
        </span>
      ),
      key: 'item-4',
      disabled: true,
      children: (
        <article className="tabs__item">
          <Garage />
        </article>
      ),
    },
  ];

  if (isAdmin)
    items.push({
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ControlOutlined />
          Купоны
        </span>
      ),
      key: 'item-5',
      children: (
        <article className="tabs__item">
          <AdminProfileCoupons />
        </article>
      ),
    });

  return (
    <>
      <section className="profile-wrapper">
        <section className="profile">
          <TabsTinder className="tabs" centered items={items} />
        </section>
      </section>
      <section className="profile-bg" />
    </>
  );
};
