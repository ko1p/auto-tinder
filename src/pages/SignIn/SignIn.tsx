import './Signin.scss';

import React from 'react';
import { SignInForm } from 'features/auth/ui/SignInForm';

export const SignIn = () => (
  <>
    <SignInForm />
    <section className="signin-bg" />
  </>
);
