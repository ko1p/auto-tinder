import { ListItem, ListModel } from './types';

export const cityList: ListItem[] = [
  { name: 'Самара', id: 10 },
  { name: 'Москва', id: 11 },
  { name: 'Киров', id: 12 },
  { name: 'Томск', id: 13 },
  { name: 'Архангельск', id: 14 },
];

export const brandList: ListItem[] = [
  { name: 'Мерс', id: 10 },
  { name: 'Лада', id: 11 },
  { name: 'Ауди', id: 12 },
  { name: 'Тайота', id: 13 },
  { name: 'Мазда', id: 14 },
];

export const modelList: ListModel = {
  10: [
    { name: 'Модель1', id: 200 },
    { name: 'Модель2', id: 210 },
    { name: 'Модель3', id: 220 },
  ],
  11: [
    { name: 'Модель4', id: 201 },
    { name: 'Модель5', id: 211 },
    { name: 'Модель6', id: 221 },
  ],
  12: [
    { name: 'Модель7', id: 202 },
    { name: 'Модель8', id: 212 },
    { name: 'Модель9', id: 222 },
  ],
  13: [
    { name: 'Модель10', id: 203 },
    { name: 'Модель11', id: 213 },
    { name: 'Модель12', id: 223 },
  ],
  14: [
    { name: 'Модель13', id: 204 },
    { name: 'Модель14', id: 214 },
    { name: 'Модель15', id: 224 },
  ],
};

export const typeList: ListItem[] = [
  { name: 'Седан', id: 1 },
  { name: 'Купе', id: 2 },
  { name: 'Фургон', id: 3 },
];

export const engineList: ListItem[] = [
  { name: 'Бензиновый', id: 1 },
  { name: 'Дизельный', id: 2 },
];

export const gearboxList: ListItem[] = [
  { name: 'Механическая', id: 1 },
  { name: 'Автомат', id: 2 },
];

export const driveList: ListItem[] = [
  { name: 'Полный', id: 1 },
  { name: 'Передний', id: 2 },
  { name: 'Задний', id: 3 },
];
