const HOME_SCREEN = '/home-screen';
export const PATH = {
  Home: '/',
  Login: '/login',
  Bakeries: '/bakeries',
  BakeryReports: '/bakery-reports',
  Users: '/users',
  UserReports: '/user-reports',
  HomeScreen: {
    Main: HOME_SCREEN,
    Carousel: `${HOME_SCREEN}/carousel`,
    Ranking: `${HOME_SCREEN}/ranking`,
    Feeds: `${HOME_SCREEN}/feeds`,
    AdminCommunity: `${HOME_SCREEN}/admin-community`,
  },
};

export type Path = (typeof PATH)[keyof typeof PATH];
