import * as React from 'react';
import AppBar from '../../features/Menu/components/AppBar';
import { Cars } from '../../features/Cars/components/Cars';
import { TabBar } from '../../features/Menu/components/TabBar';

const CarsScreen = () => {
  return (
    <>
      <AppBar />
      <Cars />
      <TabBar />
    </>
  );
};

export default CarsScreen;
