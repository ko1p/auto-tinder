import { FieldErrorsImpl } from 'react-hook-form';

export function constructorErrorHelperText(
  errors: Partial<
    FieldErrorsImpl<{
      [index: string]: string;
    }>
  >,
  nameInput: string,
): string {
  if (!errors) return '';
  const thisError = errors[nameInput];
  return thisError ? thisError?.message || 'Поле обязательно к заполнению.' : '';
}
