import { Route, Routes } from 'react-router';

import { Layout } from './Layout';
import React from 'react';
import { SignInForm } from 'features/auth/ui/SignInForm';

export const RouterPage = () => (
	<Routes>
		<Route element={<Layout />}>
			<Route path='/signin' element={<SignInForm />} />
		</Route>
	</Routes>
);
