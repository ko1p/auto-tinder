import AppBar from '../../4-features/Menu/components/AppBar';
import { TabBar } from '../../4-features/Menu/components/TabBar';
import { Outlet } from 'react-router-dom';

const ReportsScreen = () => {
  return (
    <>
      <AppBar />
      <Outlet />
      <TabBar />
    </>
  );
};

export default ReportsScreen;
