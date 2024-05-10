import { DefaultLayout } from '@/layouts';
import {
  HomePage,
  Nearbycities,
} from '@/pages';

export const PATHS = {
  HOME: '/',
  NEARBYCITY: '/nearbycities',
};

export const ROUTES = [
  {
    path: PATHS.HOME,
    title: 'Trang chủ',
    layout: DefaultLayout,
    element: HomePage,
    children: [],
  },
  {
    path: PATHS.NEARBYCITY,
    title: 'Nearby cities recommendation',
    layout: DefaultLayout,
    element: Nearbycities,
    children: [],
  }
]