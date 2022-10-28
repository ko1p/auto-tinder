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
import { buildSelectItems } from '../../utils/buildSelectItems';
import { onChangePrice, onChangeManufacture } from '../../utils/inputChange';
import { typeList, engineList, gearboxList, driveList } from '../../utils/mockData';
import { rulesDefault, rulesManufacture, rulesDescription } from '../../utils/rulesValidation';

type FormValues = {
  type: number;
  engine: number;
  gearbox: number;
  drive: number;
  description: string;
  price: number;
  manufacture: number;
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

  const navigate = useNavigate();

  function onSubmit(data: FormValues) {
    console.log(data);
    navigate('/onboarding/user-filter-form');
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
              <Select {...register('type', rulesDefault)} defaultValue={''}>
                {buildSelectItems(typeList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'type')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.engine}>
              <InputLabel>Двигатель</InputLabel>
              <Select {...register('engine', rulesDefault)} defaultValue={''}>
                {buildSelectItems(engineList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'engine')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.gearbox}>
              <InputLabel>Коробка передач</InputLabel>
              <Select {...register('gearbox', rulesDefault)} defaultValue={''}>
                {buildSelectItems(gearboxList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'gearbox')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.drive}>
              <InputLabel>Привод</InputLabel>
              <Select {...register('drive', rulesDefault)} defaultValue={''}>
                {buildSelectItems(driveList)}
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
              {...register('manufacture', rulesRequiredManufacture)}
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
