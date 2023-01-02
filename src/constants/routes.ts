export const PATH = {
  Home: '/',
  Login: '/login',
  Bakeries: '/bakeries',
  BakeryReports: '/bakery-reports',
  Users: '/users',
  UserReports: '/user-reports',
};

export type Path = typeof PATH[keyof typeof PATH];
