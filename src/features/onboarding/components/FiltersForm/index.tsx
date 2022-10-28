import styles from './style.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { constructorErrorHelperText } from '../../../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../../utils/types';
import { buildSelectItems } from '../../utils/buildSelectItems';
import {
  cityList,
  brandList,
  typeList,
  engineList,
  gearboxList,
  driveList,
  modelList,
} from '../../utils/mockData';
import { useState } from 'react';
import { onChangeManufacture, onChangeMileage, onChangePrice } from '../../utils/inputChange';
import { rulesDefault, rulesEmpty, rulesManufacture } from '../../utils/rulesValidation';

type FormValues = {
  city: number;
  brand: number;
  // model: number; Получать через стэйт models, в связи с неразрешимой ошибкой
  type: number;
  engine: number;
  gearbox: number;
  drive: number;
  priceFrom: number;
  priceTo: number;
  manufactureFrom: number;
  manufactureTo: number;
  mileageFrom: number;
  mileageTo: number;
};

export default function FiltersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [modelListInput, setModelListInput] = useState<ListItem[]>([]);

  const navigate = useNavigate();

  function handleChangeBrand(event: SelectChangeEvent<typeof brands>) {
    const {
      target: { value },
    } = event;

    const arrayValueBrand: string[] = typeof value === 'string' ? value.split(',/s') : value;

    setBrands(arrayValueBrand);

    const availablemodelList = arrayValueBrand
      .map(id => modelList[Number(id)])
      .reduce((list, item) => {
        return list.concat(item);
      }, []);

    setModelListInput(availablemodelList);

    const listAvailableModelsId = availablemodelList.map(item => item.id);
    const newValueModelsInput = models.filter(item => {
      return listAvailableModelsId.includes(Number(item));
    });

    setModels(newValueModelsInput);
  }

  function handleChangeModels(event: SelectChangeEvent<typeof models>) {
    const {
      target: { value },
    } = event;

    const arrayValue: string[] = typeof value === 'string' ? value.split(',') : value;

    setModels(arrayValue);
  }

  const rangeError = {
    type: 'focus',
    message: 'Неправильный диапозон.',
  };

  function onSubmit(data: FormValues) {
    let formStatus = true;
    console.log(data);
    console.log(models);
    if (Number(data.priceFrom) > Number(data.priceTo)) {
      setError('priceFrom', rangeError);
      setError('priceTo', rangeError);
      formStatus = false;
    }
    if (Number(data.manufactureFrom) > Number(data.manufactureTo)) {
      setError('manufactureFrom', rangeError);
      setError('manufactureTo', rangeError);
      formStatus = false;
    }
    if (Number(data.mileageFrom) > Number(data.mileageTo)) {
      setError('mileageFrom', rangeError);
      setError('mileageTo', rangeError);
      formStatus = false;
    }

    if (formStatus) {
      navigate('/');
      // Вставить изменение поля isOnboarded в сторе
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Предпочтения для обмена
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl className={styles.input} variant='standard' error={!!errors?.city}>
            <InputLabel>Город*</InputLabel>
            <Select {...register('city', rulesDefault)} defaultValue={''}>
              {buildSelectItems(cityList)}
            </Select>
            <FormHelperText>{constructorErrorHelperText(errors, 'city')}</FormHelperText>
          </FormControl>

          <div className={styles.splitBox}>
            <FormControl className={styles.input} variant='standard' error={!!errors?.type}>
              <InputLabel>Кузов</InputLabel>
              <Select {...register('type', rulesEmpty)} defaultValue={''}>
                {buildSelectItems(typeList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'type')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.engine}>
              <InputLabel>Двигатель</InputLabel>
              <Select {...register('engine', rulesEmpty)} defaultValue={''}>
                {buildSelectItems(engineList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'engine')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.gearbox}>
              <InputLabel>Коробка передач</InputLabel>
              <Select {...register('gearbox', rulesEmpty)} defaultValue={''}>
                {buildSelectItems(gearboxList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'gearbox')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard' error={!!errors?.drive}>
              <InputLabel>Привод</InputLabel>
              <Select {...register('drive', rulesEmpty)} defaultValue={''}>
                {buildSelectItems(driveList)}
              </Select>
              <FormHelperText>{constructorErrorHelperText(errors, 'drive')}</FormHelperText>
            </FormControl>

            <FormControl className={styles.input} variant='standard'>
              <InputLabel>Марка</InputLabel>
              <Select
                {...register('brand', rulesEmpty)}
                multiple
                value={brands}
                onChange={handleChangeBrand}
              >
                {buildSelectItems(brandList)}
              </Select>
            </FormControl>

            <FormControl className={styles.input} variant='standard'>
              <InputLabel>Модель</InputLabel>
              <Select
                {...register('brand', rulesEmpty)}
                multiple
                value={models}
                onChange={handleChangeModels}
              >
                {buildSelectItems(modelListInput)}
              </Select>
            </FormControl>

            <TextField
              className={styles.input}
              label='Цена от'
              fullWidth
              {...register('priceFrom', rulesEmpty)}
              error={!!errors?.priceFrom}
              helperText={constructorErrorHelperText(errors, 'priceFrom')}
              variant='standard'
              onChange={onChangePrice}
              InputProps={{
                endAdornment: <InputAdornment position='start'>₽</InputAdornment>,
              }}
            />
            <TextField
              className={styles.input}
              label='Цена до'
              fullWidth
              {...register('priceTo', rulesEmpty)}
              error={!!errors?.priceTo}
              helperText={constructorErrorHelperText(errors, 'priceTo')}
              variant='standard'
              onChange={onChangePrice}
              InputProps={{
                endAdornment: <InputAdornment position='start'>₽</InputAdornment>,
              }}
            />

            <TextField
              className={styles.input}
              label='От года'
              fullWidth
              {...register('manufactureFrom', rulesManufacture)}
              error={!!errors?.manufactureFrom}
              helperText={constructorErrorHelperText(errors, 'manufactureFrom')}
              variant='standard'
              onChange={onChangeManufacture}
            />
            <TextField
              className={styles.input}
              label='До года'
              fullWidth
              {...register('manufactureTo', rulesManufacture)}
              error={!!errors?.manufactureTo}
              helperText={constructorErrorHelperText(errors, 'manufactureTo')}
              variant='standard'
              onChange={onChangeManufacture}
            />

            <TextField
              className={styles.input}
              label='Пробег от'
              fullWidth
              {...register('mileageFrom', rulesEmpty)}
              error={!!errors?.mileageFrom}
              helperText={constructorErrorHelperText(errors, 'mileageFrom')}
              variant='standard'
              onChange={onChangeMileage}
              InputProps={{
                endAdornment: <InputAdornment position='start'>км</InputAdornment>,
              }}
            />
            <TextField
              className={styles.input}
              label='Пробег до'
              fullWidth
              {...register('mileageTo', rulesEmpty)}
              error={!!errors?.mileageTo}
              helperText={constructorErrorHelperText(errors, 'mileageTo')}
              variant='standard'
              onChange={onChangeMileage}
              InputProps={{
                endAdornment: <InputAdornment position='start'>км</InputAdornment>,
              }}
            />
          </div>

          <Button type='submit' size='large' variant='contained' fullWidth>
            Продолжить
          </Button>
        </form>
      </div>
    </div>
  );
}
