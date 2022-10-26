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
import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { setCarFormStepOne } from '../../slice';
import { ICarFormStepOne, ListItem } from '../../utils/types';
import { buildSelectItems } from '../../utils/buildSelectItems';
import { rulesDefault, rulesStateNumber, rulesVin } from '../../utils/rulesValidation';
import { brandList, cityList, modelList } from '../../utils/mockData';
import { onChangeMileage, onChangeTotalOwner, onChangeVin } from '../../utils/inputChange';

type FormValues = {
  vin: string;
  stateNumber: string;
  totalOwner: number;
  city: number;
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onSubmit(data: FormValues) {
    console.log(data);

    const dataPartOne: ICarFormStepOne = {
      vin: data.vin,
      stateNumber: data.stateNumber,
      totalOwner: Number(data.stateNumber),
      city: data.city,
      mileage: Number(data.city),
      brand: data.brand,
      model: data.brand,
    };

    dispatch(setCarFormStepOne(dataPartOne));
    navigate('/onboarding/user-car-form-two');
  }

  function onChangemodelList(id: number): void {
    setModelListInput(modelList[id]);
    setValue('model', null);
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
              {...register('stateNumber', rulesStateNumber)}
              error={!!errors?.stateNumber}
              helperText={constructorErrorHelperText(errors, 'stateNumber')}
              variant='standard'
            />
            <TextField
              className={styles.input}
              label='Количество владельцев'
              fullWidth
              {...register('totalOwner', rulesDefault)}
              error={!!errors?.totalOwner}
              helperText={constructorErrorHelperText(errors, 'totalOwner')}
              variant='standard'
              type='number'
              defaultValue={1}
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

            <FormControl className={styles.input} variant='standard' error={!!errors?.city}>
              <InputLabel>Город</InputLabel>
              <Select {...register('city', rulesDefault)} defaultValue={''}>
                {buildSelectItems(cityList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'city')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.brand}>
              <InputLabel>Марка</InputLabel>
              <Select
                {...register('brand', rulesDefault)}
                defaultValue={''}
                onChange={element => {
                  onChangemodelList(Number(element.target.value));
                }}
              >
                {buildSelectItems(brandList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'brand')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.model}>
              <InputLabel>Модель</InputLabel>
              <Select {...register('model', rulesDefault)} defaultValue={''}>
                {buildSelectItems(modelListInput)}
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
