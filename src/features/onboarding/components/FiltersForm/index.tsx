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
// import { rulesDefault } from '../../utils/rulesValidation';
import { useState } from 'react';
import { onChangePrice } from '../../utils/inputChange';

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
  manufacture: number;
  mileage: number;
};

export default function FiltersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [modelListInput, setModelListInput] = useState<ListItem[]>([]);

  const navigate = useNavigate();

  const rulesDefault = {};
  const rulesPriceFrom = {
    max: {
      value: getValues('priceTo'),
      message: 'Неправильный диапозон.',
    },
  };

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

  function handleChangePriceFrom(
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    onChangePrice(element);

    setValue('priceTo', getValues('priceTo'));
  }

  function handleChangePriceTo(
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    onChangePrice(element);

    setValue('priceFrom', getValues('priceFrom'));
  }

  function onSubmit(data: FormValues) {
    console.log(data);
    console.log(models);

    // navigate('/onboarding/user-car-form-two');
  }

  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Предпочтения для обмена
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl className={styles.input} variant='standard' error={!!errors?.city}>
            <InputLabel>Город</InputLabel>
            <Select {...register('city', rulesDefault)} defaultValue={''}>
              {buildSelectItems(cityList)}
            </Select>
            <FormHelperText>{constructorErrorHelperText(errors, 'city')}</FormHelperText>
          </FormControl>

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

            <FormControl className={styles.input} variant='standard'>
              <InputLabel>Марка</InputLabel>
              <Select
                {...register('brand', rulesDefault)}
                multiple
                value={brands}
                onChange={handleChangeBrand}
              >
                {buildSelectItems(brandList)}
              </Select>
            </FormControl>

            <FormControl className={styles.input} variant='standard'>
              <InputLabel>Модель</InputLabel>
              <Select multiple value={models} onChange={handleChangeModels}>
                {buildSelectItems(modelListInput)}
              </Select>
            </FormControl>

            <TextField
              className={styles.input}
              label='Цена от'
              fullWidth
              {...register('priceFrom', rulesPriceFrom)}
              error={!!errors?.priceFrom}
              helperText={constructorErrorHelperText(errors, 'priceFrom')}
              variant='standard'
              onChange={handleChangePriceFrom}
              InputProps={{
                endAdornment: <InputAdornment position='start'>₽</InputAdornment>,
              }}
            />

            <TextField
              className={styles.input}
              label='Цена до'
              fullWidth
              {...register('priceTo', rulesDefault)}
              error={!!errors?.priceTo}
              helperText={constructorErrorHelperText(errors, 'priceTo')}
              variant='standard'
              onChange={handleChangePriceTo}
              InputProps={{
                endAdornment: <InputAdornment position='start'>₽</InputAdornment>,
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
