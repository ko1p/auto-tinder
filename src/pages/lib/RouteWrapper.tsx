import { Forbidden } from 'pages/Forbidden/Forbidden';
import { Outlet } from 'react-router';
import React from 'react';
import { dom } from 'shared/lib';
import { IRouteProps } from './types';

export const RouteWrapper: React.FC<IRouteProps> = ({ isAccess, title }) => {
  dom.useTitle(title);
  return isAccess === undefined || isAccess === true ? (
    <Outlet />
  ) : (
    <Forbidden />
  );
};
