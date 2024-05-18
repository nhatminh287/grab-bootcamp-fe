import { DefaultLayout } from '@/layouts';
import {
  HomePage,
  Nearbycities,
  Attraction,
} from '@/pages';

export const PATHS = {
  HOME: '/',
  NEARBYCITY: '/nearbycities',
  ATTRACTION: '/attraction',
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
  },
  {
    path: PATHS.ATTRACTION,
    title: 'Attraction places recommendation',
    layout: DefaultLayout,
    element: Attraction,
    children: [],
  }
]