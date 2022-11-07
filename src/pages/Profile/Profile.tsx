import './Profile.scss';

import { Garage } from 'features/garage/ui/Garage';
import React from 'react';
import { TabsTinder } from 'shared/ui/TabsTinder/TabsTinder';
import { UserProfile } from 'entities/user/ui/UserProfile';

export const Profile = () => {
  const items = [
    {
      label: 'Мой гараж',
      key: 'item-1',
      children: (
        <article className="tabs__item">
          <Garage />
        </article>
      ),
    },
    {
      label: 'Мои совпадения',
      key: 'item-2',
      disabled: true,
      children: (
        <article className="tabs__item">
          <Garage />
        </article>
      ),
    },
    {
      label: 'Мы нравимся',
      key: 'item-3',
      disabled: true,
      children: (
        <article className="tabs__item">
          <Garage />
        </article>
      ),
    },
  ];
  return (
    <section className="profile">
      <UserProfile />
      <TabsTinder className="tabs" centered items={items} />
    </section>
  );
};
