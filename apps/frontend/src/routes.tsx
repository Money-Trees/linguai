import { Role } from '@naite/types';
import { AiFillHome } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import HomePage from './pages/home';

interface PageRoute {
  path: `/${string}`;
  component: JSX.Element;
  label: string;
  restrictions?: Role[];
}

interface NavigationRoute extends PageRoute {
  icon: IconType;
}

export const navigationRoutes: NavigationRoute[] = [
  {
    component: <HomePage />,
    icon: AiFillHome,
    label: 'Home',
    path: '/',
  },
];

export const pageRoutes: PageRoute[] = [];

export const routes: (PageRoute | NavigationRoute)[] = [
  ...navigationRoutes,
  ...pageRoutes,
];
