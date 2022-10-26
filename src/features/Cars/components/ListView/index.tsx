import styles from './style.module.scss';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { YourLikeLabel } from '../../../../ui-library/components/YourLikeLabel';
import { ReadyToSwapLabel } from '../../../../ui-library/components/ReadyToSwapLabel';

export const ListView = () => {
  return (
    <>
      <Card classes={{ root: styles.card }} className={styles.cardPromoted}>
        <CardContent classes={{ root: styles.cardContent }}>
          <Grid container spacing={0.25}>
            <Grid xs={5} item classes={{ root: styles.imageContainer }}>
              <CardMedia
                classes={{ root: styles.image }}
                component='img'
                width='320'
                image='https://ltdfoto.ru/images/2022/10/22/auto.jpg'
                alt='автомобиль'
              />
              <ReadyToSwapLabel />
            </Grid>
            <Grid className={styles.carInfo} xs={7} item>
              <Typography classes={{ root: styles.model }} component='h2'>
                Nissan X-Trail 2015
              </Typography>
              <Box display='flex' justifyContent='space-between' className={styles.priceBlock}>
                <Typography classes={{ root: styles.price }}>Цена: 2 540 000 ₽</Typography>
                <Box display='flex' alignItems='center' className={styles.reimburse}>
                  <Typography classes={{ root: styles.paymentType }}>Доплатят&nbsp;</Typography>
                  <Typography classes={{ root: styles.paymentValue }}>100 000 ₽</Typography>
                </Box>
              </Box>
              <Grid container>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>51 000 км</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Бензин</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Полный</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>3 владельца</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Вариатор</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Внедорожник</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card classes={{ root: styles.card }}>
        <CardContent classes={{ root: styles.cardContent }}>
          <Grid container spacing={0.25}>
            <Grid xs={5} item classes={{ root: styles.imageContainer }}>
              <CardMedia
                classes={{ root: styles.image }}
                component='img'
                width='320'
                image='https://chat-me.gq/auto.jpg'
                alt='автомобиль'
              />
            </Grid>
            <Grid className={styles.carInfo} xs={7} item>
              <Typography classes={{ root: styles.model }} component='h2'>
                Nissan X-Trail 2015
              </Typography>
              <Box display='flex' justifyContent='space-between' className={styles.priceBlock}>
                <Typography classes={{ root: styles.price }}>Цена: 2 540 000 ₽</Typography>
                <Box display='flex' alignItems='center' className={styles.surcharge}>
                  <Typography classes={{ root: styles.paymentType }}>Доплатить&nbsp;</Typography>
                  <Typography classes={{ root: styles.paymentValue }}>200 000 ₽</Typography>
                </Box>
              </Box>
              <Grid container>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>51 000 км</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Бензин</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Полный</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>3 владельца</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Вариатор</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Внедорожник</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card classes={{ root: styles.card }}>
        <CardContent classes={{ root: styles.cardContent }}>
          <Grid container spacing={0.25}>
            <Grid xs={5} item classes={{ root: styles.imageContainer }}>
              <CardMedia
                classes={{ root: styles.image }}
                component='img'
                width='320'
                image='https://ltdfoto.ru/images/2022/10/22/auto.jpg'
                alt='автомобиль'
              />
              <YourLikeLabel />
            </Grid>
            <Grid className={styles.carInfo} xs={7} item>
              <Typography classes={{ root: styles.model }} component='h2'>
                Nissan X-Trail 2015
              </Typography>
              <Box display='flex' justifyContent='space-between' className={styles.priceBlock}>
                <Typography classes={{ root: styles.price }}>Цена: 2 540 000 ₽</Typography>
                {/* <Box display='flex' alignItems='center' className={styles.surcharge}>*/}
                {/*  <Typography classes={{ root: styles.paymentType }}>Доплатить&nbsp;</Typography>*/}
                {/*  <Typography classes={{ root: styles.paymentValue }}>200 000 ₽</Typography>*/}
                {/* </Box>*/}
                <Box display='flex' alignItems='center' className={styles.reimburse}>
                  <Typography classes={{ root: styles.paymentType }}>Доплатят&nbsp;</Typography>
                  <Typography classes={{ root: styles.paymentValue }}>100 000 ₽</Typography>
                </Box>
              </Box>
              <Grid container>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>51 000 км</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Бензин</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Полный</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>3 владельца</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Вариатор</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography classes={{ root: styles.parameters }}>Внедорожник</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
