import styles from './style.module.scss';
import Wrapper from '../../../../ui-library/components/Wrapper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../../../store/hooks/redux';

const SuccessSignup = () => {
  const { email } = useAppSelector(state => state.auth);
  return (
    <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
      <Box p={5} my={10} display='flex' flexDirection='column' alignItems='center'>
        <Typography classes={{ root: styles.title }} variant='h5' component='h1'>
          На почтовый адрес {email} отправлено письмо с ссылкой для подтверждения аккаунта.
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default SuccessSignup;
