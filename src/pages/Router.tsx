import React from 'react';
import { Route, Routes } from 'react-router';
import { SignInForm } from 'features/auth/ui/SignInForm';
import { Main } from 'features/Main/Main';
import { routing } from 'shared/routing';
import { Layout } from './Layout';

export const RouterPage = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={routing.signIn} element={<SignInForm />} />
      <Route path={routing.main} element={<Main />} />
    </Route>
  </Routes>
);
