import AppBar from '../../4-features/Menu/components/AppBar';
import { TabBar } from '../../4-features/Menu/components/TabBar';
import { Outlet } from 'react-router-dom';

const PromotionScreen = () => {
  return (
    <>
      <AppBar />
      <Outlet />
      <TabBar />
    </>
  );
};

export default PromotionScreen;
