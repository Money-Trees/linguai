import { Role } from '@naite/types';
import HomePage from './pages/home';
import Lesson from './pages/lesson';

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
];

export const pageRoutes: PageRoute[] = [];

export const routes: PageRoute[] = [...navigationRoutes, ...pageRoutes];
