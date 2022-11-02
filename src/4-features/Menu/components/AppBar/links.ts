import { Links } from '../../types';

export const links: Links[] = [
  {
    text: 'Мои машины',
    path: '/my-cars',
  },
  {
    text: 'Продвижение',
    path: '/promotion',
  },
  {
    text: 'Отчёты',
    path: '/reports',
  },
  {
    text: 'Выход',
    path: '/signin',
    action: 'logout',
  },
];
