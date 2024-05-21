import { DefaultLayout } from '@/layouts';
import {
  HomePage,
  Nearbycities,
  Attraction,
  Community,
  AttractionDetail,
  Contribute
} from '@/pages';

export const PATHS = {
  HOME: '/',
  NEARBYCITY: '/nearbycities',
  ATTRACTION: '/attraction',
  COMMUNITY: '/community',
  ATTRACTIONDETAIL: '/attraction/detail',
  CONTRIBUTE: '/contribute'
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
  },
  {
    path: PATHS.COMMUNITY,
    title: 'Top attraction places recommendation',
    layout: DefaultLayout,
    element: Community,
    children: [],
  },
  {
    path: PATHS.ATTRACTIONDETAIL,
    title: 'Attraction detail',
    layout: DefaultLayout,
    element: AttractionDetail,
    children: [],
  },
  {
    path: PATHS.CONTRIBUTE,
    title: 'Contribute',
    layout: DefaultLayout,
    element: Contribute,
    children: [],
  },
]