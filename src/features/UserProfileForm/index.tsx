import styles from './style.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Autocomplete, Typography } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

interface Citylabel {
  label: string;
}

export default function UserForm() {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-09-10T21:11:54'));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const cities: Array<Citylabel> = [
    { label: 'Москва' },
    { label: 'Самара' },
    { label: 'Томск' },
    { label: 'Астрахань' },
    { label: 'Якутск' },
    { label: 'Зеленоград' },
    { label: 'Норильск' },
    { label: 'Киров' },
    { label: 'Борск' },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Профиль пользователя
        </Typography>
        <TextField className={styles.input} label='Имя' fullWidth />
        <TextField className={styles.input} label='Фамилия' fullWidth />
        <Autocomplete
          className={styles.input}
          disablePortal
          id='autocomplete-city'
          options={cities}
          renderInput={params => <TextField {...params} label='Город' />}
        />
        <TextField className={styles.input} label='Лет стажа вождения' fullWidth type='number' />
        <LocalizationProvider adapterLocale='ru' dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            className={styles.input}
            label='Дата рождения'
            inputFormat='MM.DD.YYYY'
            value={value}
            onChange={handleChange}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button type='submit' size='large' variant='contained' fullWidth>
          Продолжить
        </Button>
      </div>
    </div>
  );
}
