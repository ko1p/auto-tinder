import './Layout.scss';

import { Footer, Header } from 'widgets';

import { Outlet } from 'react-router-dom';
import React from 'react';

export const Layout = () => (
  <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
