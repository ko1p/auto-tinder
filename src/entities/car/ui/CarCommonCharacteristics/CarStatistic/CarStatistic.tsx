import { Col, Row, Statistic } from 'antd';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';

import React from 'react';

interface IProps {
  likes: number;
  views: number;
  todayLikes: number;
  todayViews: number;
}

export const CarStatistic: React.FC<IProps> = ({
  likes,
  views,
  todayLikes,
  todayViews,
}) => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic
        style={{ width: '80%' }}
        title="Понравилось / сегодня"
        value={`${likes} / ${todayLikes}`}
        prefix={<LikeOutlined />}
      />
    </Col>
    <Col span={12}>
      <Statistic
        style={{ width: '80%' }}
        title="Просмотров / сегодня"
        value={`${views} / ${todayViews}`}
        prefix={<EyeOutlined />}
      />
    </Col>
  </Row>
);
