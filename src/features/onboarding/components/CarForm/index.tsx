import styles from './style.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  AutocompleteRenderInputParams,
  Typography,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { constructorErrorHelperText } from '../../../../ultils/validation';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type FormValues = {
  vin: number;
  stateNumber: string;
  totalOwner: number;
  city: number;
  mileage: number;
  brand: number;
  model: number | null;
};

interface ListItem {
  name: string;
  id: number;
}

interface Model {
  name: string;
  id: number;
}

interface ListModel {
  [idBrand: number]: Model[];
}

export default function CarForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [modelList, setModelList] = useState<Model[]>([]);

  const navigate = useNavigate();

  const rules = {
    required: true,
    // minLength: { value: 2, message: 'Поле должно содержать минимум 2 буквы.' },
    // pattern: { value: /^[а-яА-Я]*$/, message: 'Допускаются только русские буквы.' },
  };

  const rulesVin = {
    required: true,
    minLength: { value: 17, message: 'Поле должно содержать 18 символов.' },
    maxLength: { value: 18, message: 'Поле должно содержать 18 символов.' },
    pattern: {
      value: /^(?=[a-z0-9])[^qio]*$/i,
      message: 'Допускаются только латинские буквы (кроме QOI) и цифры.',
    },
  };

  const rulesSelect = {
    required: true,
  };

  const cityList: ListItem[] = [
    { name: 'Самара', id: 10 },
    { name: 'Москва', id: 11 },
    { name: 'Киров', id: 12 },
    { name: 'Томск', id: 13 },
    { name: 'Архангельск', id: 14 },
  ];

  const brandList: ListItem[] = [
    { name: 'Мерс', id: 10 },
    { name: 'Лада', id: 11 },
    { name: 'Ауди', id: 12 },
    { name: 'Тайота', id: 13 },
    { name: 'Мазда', id: 14 },
  ];

  const modalList: ListModel = {
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

  function onSubmit(date: FormValues) {
    console.log(date);
    // navigate('/onboarding/user-phone-request');
  }

  function buildSelectItems(data: ListItem[]): JSX.Element[] {
    return data.map(item => (
      <MenuItem value={item.id} key={item.id}>
        {item.name}
      </MenuItem>
    ));
  }

  function onChangeModalList(id: number): void {
    setModelList(modalList[id]);
    setValue('model', null);
  }

  function onChangeVin(element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    let editableValue: string = element.target.value;
    editableValue = editableValue.length > 18 ? editableValue.slice(0, 18) : editableValue;
    element.target.value = editableValue;
  }

  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Информация об автомобиле
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.input}
            label='VIN'
            fullWidth
            {...register('vin', rulesVin)}
            error={!!errors?.vin}
            helperText={constructorErrorHelperText(errors, 'vin')}
            variant='standard'
            onChange={onChangeVin}
          />
          <div className={styles.splitBox}>
            <TextField
              className={styles.input}
              label='Номер автомобиля'
              fullWidth
              {...register('stateNumber', rules)}
              error={!!errors?.stateNumber}
              helperText={constructorErrorHelperText(errors, 'stateNumber')}
              variant='standard'
            />
            <TextField
              className={styles.input}
              label='Количество владельцев'
              fullWidth
              {...register('totalOwner', rules)}
              error={!!errors?.totalOwner}
              helperText={constructorErrorHelperText(errors, 'totalOwner')}
              variant='standard'
            />
            <TextField
              className={styles.input}
              label='Пробег'
              fullWidth
              {...register('mileage', rules)}
              error={!!errors?.mileage}
              helperText={constructorErrorHelperText(errors, 'mileage')}
              variant='standard'
            />

            <FormControl className={styles.input} variant='standard' error={!!errors?.city}>
              <InputLabel>Город</InputLabel>
              <Select {...register('city', rulesSelect)} defaultValue={''}>
                {buildSelectItems(cityList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'city')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.brand}>
              <InputLabel>Марка</InputLabel>
              <Select
                {...register('brand', rulesSelect)}
                defaultValue={''}
                onChange={element => {
                  onChangeModalList(Number(element.target.value));
                }}
              >
                {buildSelectItems(brandList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'brand')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.model}>
              <InputLabel>Модель</InputLabel>
              <Select {...register('model', rulesSelect)} defaultValue={''}>
                {buildSelectItems(modelList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'model')}</FormHelperText>
            </FormControl>
          </div>

          <Button type='submit' size='large' variant='contained' fullWidth>
            Продолжить
          </Button>
        </form>
      </div>
    </div>
  );
}
