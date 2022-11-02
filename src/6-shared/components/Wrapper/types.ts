import { ReactNode } from 'react';

export interface WrapperProps {
  children: ReactNode;
  component?: 'header' | 'main' | 'footer' | 'aside' | 'section' | 'article';
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
