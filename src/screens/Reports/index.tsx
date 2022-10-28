import AppBar from '../../features/Menu/components/AppBar';
import { TabBar } from '../../features/Menu/components/TabBar';
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
