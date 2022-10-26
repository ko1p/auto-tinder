import styles from './style.module.scss';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { ReadyToSwapLabel } from '../../../../ui-library/components/ReadyToSwapLabel';
import { CarLikeDislike } from '../CarLikeDislike';

export const TinderView = () => {
  return (
    <Card classes={{ root: styles.card }}>
      <CardContent classes={{ root: styles.cardContent }}>
        <CardMedia
          classes={{ root: styles.cardMedia }}
          component='img'
          image='https://ltdfoto.ru/images/2022/10/22/auto.jpg'
          alt='автомобиль'
        />
        {/* <YourLikeLabel />*/}
        <ReadyToSwapLabel />
        {/* <OtherLikeLabel />*/}
        <Box mx={1}>
          <Typography classes={{ root: styles.promotion }}>ПРОДВИГАЕТСЯ</Typography>
          <Typography classes={{ root: styles.model }} component='h2'>
            Nissan X-Trail 2015
          </Typography>
          <Typography classes={{ root: styles.price }}>Цена: 2 540 000 ₽</Typography>

          {/* <Box className={styles.reimburse}>*/}
          {/*  <Typography classes={{ root: styles.paymentType }}>ДОПЛАТЯТ</Typography>*/}
          {/*  <Typography classes={{ root: styles.paymentValue }}>200 000 ₽</Typography>*/}
          {/* </Box>*/}

          <Box className={styles.surcharge}>
            <Typography classes={{ root: styles.paymentType }}>НУЖНО ДОПЛАТИТЬ</Typography>
            <Typography classes={{ root: styles.paymentValue }}>200 000 ₽</Typography>
          </Box>

          <Box width={0.65}>
            <Grid my={1} container spacing={0.25}>
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
          </Box>
        </Box>
      </CardContent>
      <CarLikeDislike />
    </Card>
  );
};
