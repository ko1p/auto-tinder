import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './style.module.scss';

interface propsInterface {
  card: React.ReactNode;
}

export default function RegistrationCard({ card }: propsInterface) {
  return (
    <Card variant='outlined' className={styles.card}>
      <CardContent>{card}</CardContent>
    </Card>
  );
}
