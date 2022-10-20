import { Links } from '../../types';

export const links: Links[] = [
  {
    text: 'Мои машины',
    path: '/',
  },
  {
    text: 'Продвижение',
    path: '/',
  },
  {
    text: 'Отчёты',
    path: '/',
  },
  {
    text: 'Выход',
    path: '/signin',
    action: 'logout',
  },
];
