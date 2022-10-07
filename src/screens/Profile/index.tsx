import './style.scss';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Link to='/'>На главную</Link>
    </div>
  );
}
