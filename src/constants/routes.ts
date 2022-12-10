export const PATH = {
  Login: '/login',
  Bakeries: '/bakeries',
  BakeryReport: '/bakery-report',
  Users: '/users',
  UserReport: '/user-report',
};

export type Path = typeof PATH[keyof typeof PATH];
