import { Outlet } from 'react-router-dom';
import AppBar from '../../4-features/Menu/components/AppBar';

export default function Onboarding() {
  return (
    <main>
      <AppBar />
      <Outlet />
    </main>
  );
}
