import { Role } from '@naite/types';
import HomePage from './pages/home';
import Lesson from './pages/lesson';
import Settings from './pages/settings';

interface PageRoute {
  path: `/${string}`;
  component: JSX.Element;
  label: string;
  restrictions?: Role[];
}

export const navigationRoutes: PageRoute[] = [
  {
    component: <HomePage />,
    label: 'Home',
    path: '/',
  },
  {
    component: <Lesson />,
    label: 'Lesson',
    path: '/lesson/:id',
  },
  {
    component: <Settings />,
    label: 'Settings',
    path: '/settings',
  },
];

export const pageRoutes: PageRoute[] = [];

export const routes: PageRoute[] = [...navigationRoutes, ...pageRoutes];
