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
import { constructorErrorHelperText } from '../../../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../../utils/types';
import { buildSelectItems } from '../../utils/buildSelectItems';

type FormValues = {
  type: number;
  engine: number;
  gearbox: number;
  drive: number;
  description: string;
  price: number;
  manufacture: number;
};

export default function CarFormStepTwo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const navigate = useNavigate();

  const typeList: ListItem[] = [
    { name: 'Седан', id: 1 },
    { name: 'Купе', id: 2 },
    { name: 'Фургон', id: 3 },
  ];

  const engineList: ListItem[] = [
    { name: 'Бензиновый', id: 1 },
    { name: 'Дизельный', id: 2 },
  ];

  const gearboxList: ListItem[] = [
    { name: 'Механическая', id: 1 },
    { name: 'Автомат', id: 2 },
  ];

  const driveList: ListItem[] = [
    { name: 'Полный', id: 1 },
    { name: 'Передний', id: 2 },
    { name: 'Задний', id: 3 },
  ];

  const rulesManufacture = {
    required: true,
    minLength: { value: 4, message: 'Укажите год полностью.' },
    maxLength: { value: 4, message: 'Укажите год полностью.' },
  };

  const rules = {
    required: true,
  };

  const rulesDescription = {
    maxLength: { value: 512, message: 'Описание не должно превышать 512 символов.' },
  };

  function onChangePrice(element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    let editableValue: string = element.target.value.replace(/[^\d]/g, '');
    editableValue = editableValue.length > 9 ? editableValue.slice(0, 9) : editableValue;
    element.target.value = editableValue;
  }

  function onChangeManufacture(
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    let editableValue: string = element.target.value.replace(/[^\d]/g, '');
    editableValue = editableValue.length > 4 ? editableValue.slice(0, 4) : editableValue;

    if (editableValue.length >= 4) {
      if (Number(editableValue) < 1900) editableValue = '1900';
      if (Number(editableValue) > 2022) editableValue = '2022';
    }

    element.target.value = editableValue;
  }

  function onSubmit(data: FormValues) {
    console.log(data);
    // navigate('/onboarding/user-car-form-two');
  }

  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Информация об автомобиле
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.splitBox}>
            <FormControl className={styles.input} variant='standard' error={!!errors?.type}>
              <InputLabel>Кузов</InputLabel>
              <Select {...register('type', rules)} defaultValue={''}>
                {buildSelectItems(typeList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'type')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.engine}>
              <InputLabel>Двигатель</InputLabel>
              <Select {...register('engine', rules)} defaultValue={''}>
                {buildSelectItems(engineList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'engine')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.gearbox}>
              <InputLabel>Коробка передач</InputLabel>
              <Select {...register('gearbox', rules)} defaultValue={''}>
                {buildSelectItems(gearboxList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'gearbox')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.drive}>
              <InputLabel>Привод</InputLabel>
              <Select {...register('drive', rules)} defaultValue={''}>
                {buildSelectItems(driveList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'drive')}</FormHelperText>
            </FormControl>

            <TextField
              className={styles.input}
              label='Цена'
              fullWidth
              {...register('price', rules)}
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
              {...register('manufacture', rulesManufacture)}
              error={!!errors?.manufacture}
              helperText={constructorErrorHelperText(errors, 'manufacture')}
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
