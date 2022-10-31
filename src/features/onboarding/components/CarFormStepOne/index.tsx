import styles from './style.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  Typography,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { constructorErrorHelperText } from '../../../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { setCarFormStepOne } from '../../slice';
import { ICarFormStepOne, ListItem } from '../../utils/types';
import { buildSelectItems } from '../../utils/buildSelectItems';
import { rulesDefault, rulesStateNumber, rulesVin } from '../../utils/rulesValidation';
import { onChangeMileage, onChangeTotalOwner, onChangeVin } from '../../utils/inputChange';
import { menuPropsStyle } from '../../utils/muiStyleProps';
import { getDictionary } from '../../api';

type FormValues = {
  vinCode: string;
  stateNumber: string;
  totalOwners: number;
  exchangeCity: number;
  mileage: number;
  brand: number;
  model: number | null;
};

export default function CarFormStepOne() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [modelListInput, setModelListInput] = useState<ListItem[]>([]);
  const [brands, setBrands] = useState<ListItem[]>([]);
  const [cities, setCities] = useState<ListItem[]>([]);
  const [models, setModels] = useState<ListItem[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onChangemodelList(id: number): void {
    // Изначально предполагался другой тип базы данных моделей автомобилей и этот метод писался под него.
    // setModelListInput(modelList[id]);
    // setValue('model', null);
  }

  function onSubmit(data: FormValues) {
    const dataPartOne: ICarFormStepOne = {
      vinCode: data.vinCode,
      stateNumber: data.stateNumber,
      totalOwners: Number(data.totalOwners),
      exchangeCity: data.exchangeCity,
      mileage: Number(data.exchangeCity),
      brand: data.brand,
      model: data.brand,
    };

    dispatch(setCarFormStepOne(dataPartOne));
    navigate('/onboarding/user-car-form-two');
  }

  useEffect(() => {
    try {
      getDictionary('cities').then(respons => {
        setCities(respons?.data || []);
      });
      getDictionary('brands').then(respons => {
        setBrands(respons?.data || []);
      });
      getDictionary('models').then(respons => {
        setModels(respons?.data || []);
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
          <TextField
            className={styles.input}
            label='vin'
            fullWidth
            {...register('vinCode', rulesVin)}
            error={!!errors?.vinCode}
            helperText={constructorErrorHelperText(errors, 'vinCode')}
            variant='standard'
            onChange={onChangeVin}
          />
          <div className={styles.splitBox}>
            <TextField
              className={styles.input}
              label='Номер автомобиля'
              fullWidth
              {...register('stateNumber', rulesStateNumber)}
              error={!!errors?.stateNumber}
              helperText={constructorErrorHelperText(errors, 'stateNumber')}
              variant='standard'
            />
            <TextField
              className={styles.input}
              label='Количество владельцев'
              fullWidth
              {...register('totalOwners', rulesDefault)}
              error={!!errors?.totalOwners}
              helperText={constructorErrorHelperText(errors, 'totalOwners')}
              variant='standard'
              type='number'
              defaultValue='1'
              InputProps={{ inputProps: { min: 1, max: 99 } }}
              onChange={onChangeTotalOwner}
            />
            <TextField
              className={styles.input}
              label='Пробег'
              fullWidth
              {...register('mileage', rulesDefault)}
              error={!!errors?.mileage}
              helperText={constructorErrorHelperText(errors, 'mileage')}
              variant='standard'
              onChange={onChangeMileage}
              InputProps={{
                endAdornment: <InputAdornment position='start'>км</InputAdornment>,
              }}
            />

            <FormControl className={styles.input} variant='standard' error={!!errors?.exchangeCity}>
              <InputLabel>Город</InputLabel>
              <Select
                {...register('exchangeCity', rulesDefault)}
                defaultValue={''}
                MenuProps={menuPropsStyle}
              >
                {buildSelectItems(cities)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'exchangeCity')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.brand}>
              <InputLabel>Марка</InputLabel>
              <Select
                MenuProps={menuPropsStyle}
                {...register('brand', rulesDefault)}
                defaultValue={''}
                onChange={element => {
                  onChangemodelList(Number(element.target.value));
                }}
              >
                {buildSelectItems(brands)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'brand')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.model}>
              <InputLabel>Модель</InputLabel>
              <Select
                MenuProps={menuPropsStyle}
                {...register('model', rulesDefault)}
                defaultValue={''}
              >
                {buildSelectItems(models)}
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
