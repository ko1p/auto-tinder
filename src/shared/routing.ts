export const routing = {
  main: '/',
  notFound: '/*',
  signUp: '/signup',
  signIn: '/signin',
  profile: '/profile/:userId',
  navProvile: (id: string) => `/profile/${id}`,
  cars: '/cars',
  coupons: '/coupons',
  privacy: '/privacy',
  confirm: '/confirm/:verificationToken',
  carDetail: '/cars/:id',
  navCarDetail: (id: number) => `/cars/${id}`,
  forgot: '/forgot-password',
  resetPassword: `/users/reset-password/:recoveryToken`,
};
