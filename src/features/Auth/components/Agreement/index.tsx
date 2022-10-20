import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Wrapper from '../../../../ui-library/components/Wrapper';
import { agreementsData } from './data';

const Agreement = () => {
  const [agreementNumber, setAgreementNumber] = useState(0);

  const navigate = useNavigate();

  const nextArgeementHandler = () => {
    const numOfAgreements = agreementsData.length;

    agreementNumber + 1 >= numOfAgreements
      ? navigate('/signup')
      : setAgreementNumber(agreementNumber + 1);
  };

  return (
    <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
      <Box p={5}>
        {agreementsData.map(
          (agr, i) =>
            i === agreementNumber && (
              <Box key={`${i}-agreement`}>
                <Typography classes={{ root: styles.title }} variant='h5' component='h1'>
                  {agr.title}
                </Typography>
                <Typography className={styles.agreement} align='center' variant='body2'>
                  {agr.text}
                </Typography>
              </Box>
            ),
        )}
        <Box display='flex' justifyContent='center'>
          <Button
            className={styles.button}
            type='submit'
            size='large'
            variant='contained'
            fullWidth
            onClick={() => nextArgeementHandler()}
          >
            Продолжить
          </Button>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Agreement;
