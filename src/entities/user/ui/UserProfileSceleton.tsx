import './UserProfile.scss';

import { DotChartOutlined } from '@ant-design/icons';
import React from 'react';
import { Skeleton } from 'antd';

export const UserProfileSkeleton: React.FC = () => (
  <section className="user-profile">
    <h2>
      <Skeleton.Input active />
    </h2>
    <Skeleton.Node
      className="user-profile__table"
      active
      style={{ width: '100%', height: 150 }}
    >
      <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
    </Skeleton.Node>
  </section>
);
