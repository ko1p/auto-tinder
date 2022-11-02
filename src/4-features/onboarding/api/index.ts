import { AxiosError } from 'axios';
import axios from '../../../6-shared/utils/axios';
import { ICar, IDictionaryResponse, ListItem } from '../utils/types';

export async function savePhone(phone: string): Promise<number | null> {
  const id = localStorage.getItem('id');

  try {
    const respons = await axios.patch(`/users/${id}`, { phone });

    return respons.status;
  } catch (e) {
    const error = e as AxiosError;
    return error.response?.status || null;
  }
}

export async function getDictionary(name: string): Promise<IDictionaryResponse> {
  try {
    const respons = await axios.get(`/cars/${name}`);

    const data = respons.data as ListItem[];

    return { data, status: respons.status };
  } catch (e) {
    const error = e as AxiosError;
    return { status: error.response?.status || null };
  }
}

export async function saveCar(data: ICar): Promise<IDictionaryResponse> {
  try {
    const respons = await axios.post('/cars', { ...data });

    return {
      data: respons.data,
      status: respons.status,
    };
  } catch (e) {
    const error = e as AxiosError;
    return { status: error.response?.status || null };
  }
}

// export async function saveFilters(data: IFilters) {
//   try {
//     const respons = await axios.post('/cars', { ...data });

//     return respons.status;
//   } catch (e) {
//     const error = e as AxiosError;
//     return error.response?.status;
//   }
// }
