import './Forgot.scss';

import { MailForm } from 'features/forgot/ui/MailForm/MailForm';
import { PasswordForm } from 'features/forgot/ui/PasswordForm/PasswordForm';
import React from 'react';

interface IProps {
  stage: 'mail' | 'pass';
}

export const Forgot: React.FC<IProps> = ({ stage }) => (
  <>
    {stage === 'mail' ? <MailForm /> : <PasswordForm />}
    <section className="forgot-bg" />
  </>
);
