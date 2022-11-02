import styles from './style.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Select,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { constructorErrorHelperText } from '../../../../6-shared/utils/validation';
import { useNavigate } from 'react-router-dom';
import { buildSelectItems } from '../../utils/buildSelectItems';
import { onChangePrice, onChangeManufacture } from '../../utils/inputChange';
import { rulesDefault, rulesManufacture, rulesDescription } from '../../utils/rulesValidation';
import { useEffect, useState } from 'react';
import { ICar, ListItem } from '../../utils/types';
import { getDictionary, saveCar } from '../../api';
import { menuPropsStyle } from '../../utils/muiStyleProps';
import { useAppSelector } from '1-app/store/hooks/redux';

type FormValues = {
  body: number;
  engine: number;
  gearbox: number;
  drive: number;
  description: string;
  price: number;
  manufacturedAt: number;
};

const rulesRequiredManufacture = {
  required: true,
  ...rulesManufacture,
};

export default function CarFormStepTwo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [gearBoxes, setGearBoxes] = useState<ListItem[]>([]);
  const [drives, setDrives] = useState<ListItem[]>([]);
  const [bodies, setBodies] = useState<ListItem[]>([]);
  const [engines, setEngines] = useState<ListItem[]>([]);

  const navigate = useNavigate();
  const formCarStepOne = useAppSelector(state => state.userProfile.formCarStepOne);

  function onSubmit(data: FormValues) {
    const id = localStorage.getItem('id');

    if (id && formCarStepOne) {
      const carData: ICar = {
        ...formCarStepOne,
        userId: id,
        body: data.body,
        engine: data.engine,
        gearbox: data.engine,
        drive: data.gearbox,
        description: data.description,
        price: Number(data.price),
        manufacturedAt: Number(data.manufacturedAt),
        isExchanged: true,
        isPromoted: false,
      };

      saveCar(carData).then(response => {
        if (response.status === 200) {
          navigate('/onboarding/user-filter-form');
        } else {
          alert(`Что-то пошло не так, ошибка: ${response.status}`);
        }
      });
    }
  }

  useEffect(() => {
    if (formCarStepOne === null) navigate('/onboarding/user-car-form');

    try {
      getDictionary('gearboxes').then(respons => {
        setGearBoxes(respons?.data || []);
      });
      getDictionary('drives').then(respons => {
        setDrives(respons?.data || []);
      });
      getDictionary('bodies').then(respons => {
        setBodies(respons?.data || []);
      });
      getDictionary('engines').then(respons => {
        setEngines(respons?.data || []);
      });
    } catch (error) {
      alert('Что-то пошло не так. Произашла ошибка при запросе словоря');
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Информация об автомобиле
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.splitBox}>
            <FormControl className={styles.input} variant='standard' error={!!errors?.body}>
              <InputLabel>Кузов</InputLabel>
              <Select
                MenuProps={menuPropsStyle}
                {...register('body', rulesDefault)}
                defaultValue={''}
              >
                {buildSelectItems(bodies)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'body')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.engine}>
              <InputLabel>Двигатель</InputLabel>
              <Select
                MenuProps={menuPropsStyle}
                {...register('engine', rulesDefault)}
                defaultValue={''}
              >
                {buildSelectItems(engines)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'engine')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.gearbox}>
              <InputLabel>Коробка передач</InputLabel>
              <Select
                MenuProps={menuPropsStyle}
                {...register('gearbox', rulesDefault)}
                defaultValue={''}
              >
                {buildSelectItems(gearBoxes)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'gearbox')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.drive}>
              <InputLabel>Привод</InputLabel>
              <Select
                MenuProps={menuPropsStyle}
                {...register('drive', rulesDefault)}
                defaultValue={''}
              >
                {buildSelectItems(drives)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'drive')}</FormHelperText>
            </FormControl>

            <TextField
              className={styles.input}
              label='Цена'
              fullWidth
              {...register('price', rulesDefault)}
              error={!!errors?.price}
              helperText={constructorErrorHelperText(errors, 'price')}
              variant='standard'
              onChange={onChangePrice}
              InputProps={{
                endAdornment: <InputAdornment position='start'>₽</InputAdornment>,
              }}
            />

            <TextField
              className={styles.input}
              label='Год'
              fullWidth
              {...register('manufacturedAt', rulesRequiredManufacture)}
              error={!!errors?.manufacturedAt}
              helperText={constructorErrorHelperText(errors, 'manufacturedAt')}
              variant='standard'
              onChange={onChangeManufacture}
            />
          </div>

          <TextField
            className={styles.input}
            label='Описание'
            fullWidth
            {...register('description', rulesDescription)}
            error={!!errors?.description}
            helperText={constructorErrorHelperText(errors, 'description')}
            variant='standard'
            rows={6}
            multiline
          />

          <Button type='submit' size='large' variant='contained' fullWidth>
            Продолжить
          </Button>
        </form>
      </div>
    </div>
  );
}
