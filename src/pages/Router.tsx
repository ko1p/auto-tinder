import { Route, Routes } from 'react-router';

import React from 'react';
import { SignInForm } from 'features/auth/ui/SignInForm';
import { Layout } from './Layout';

export const RouterPage = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/signin" element={<SignInForm />} />
    </Route>
  </Routes>
);
