import styles from './style.module.scss';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Registration() {
  return (
    <>
      {/* Компонент шапки */}
      {/* Grid с атрибутом container, создаёт контейнер для адаптива */}
      <Grid container>
        {/* То какая ширина будет у компонента на разных разрешениях (измеряется в колонках) xs-(0-600) sm-(600-900) md-(900-1200) lg-(1200-1536px) xl-(1536рх и более)*/}
        <Grid classes={{ root: styles.header }} xs={12} sm={10} md={8} lg={6} xl={4}>
          <Typography variant='h3' component='h1'>
            Логотип
          </Typography>
        </Grid>
      </Grid>
      {/* Компонент с регистрацией */}
      {/* Грубо говоря используя связку двух Grid из 22 и 23 строчки мы можем регулировать отображение по ширине всех компонентов и страниц. */}
      <Grid container>
        <Grid classes={{ root: styles.root }} xs={12} sm={10} md={8} lg={6} xl={4}>
          {/* Ширину любого компонента можно регулировать просто меняя количество колонок */}
          <Typography classes={{ root: styles.title }} variant='h5'>
            Создание аккаунта
          </Typography>
          <form>
            <TextField
              className={styles.field}
              label='Полное имя'
              fullWidth
              value='Какой-то введённый текст'
            />
            <TextField className={styles.field} label='E-Mail' fullWidth />
            <TextField
              className={styles.field}
              label='Номер телефона'
              type='tel'
              error={true}
              helperText={'Текст ошибки'}
              fullWidth
            />
            <TextField className={styles.field} label='Пароль' type='password' fullWidth />
            <Button type='submit' size='large' variant='contained' fullWidth>
              Зарегистрироваться
            </Button>
            <Typography variant='body1'>
              Body1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid eaque
              inventore ipsum minus sed voluptatum. Commodi cupiditate dolores esse excepturi
              explicabo illum minus odio praesentium, quam. A ad animi aspernatur autem consectetur
              debitis dolorum ducimus earum?
            </Typography>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
