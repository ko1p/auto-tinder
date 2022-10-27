import AppBar from '../../features/Menu/components/AppBar';
import { TabBar } from '../../features/Menu/components/TabBar';
import Wrapper from '../../ui-library/components/Wrapper';

const PromotionScreen = () => {
  return (
    <>
      <AppBar />
      <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
        <h1>Здесь будет страница с информацией о продвижении авто</h1>
      </Wrapper>
      <TabBar />
    </>
  );
};

export default PromotionScreen;
