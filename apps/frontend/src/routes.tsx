import { Role } from '@naite/types';
import HomePage from './pages/home';
import Lesson from './pages/lesson';
import Profile from './pages/profile';

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
    component: <Profile />,
    label: 'Profile',
    path: '/profile',
  },
];

export const pageRoutes: PageRoute[] = [];

export const routes: PageRoute[] = [...navigationRoutes, ...pageRoutes];
