import { createBrowserRouter } from 'react-router';
import App from '../App';
import Auth from '../pages/auth/Auth';
import ErrorPage from '../components/layout/ErrorPage';
import Home from '../pages/dashboard/home/Home';
import Settings from '../pages/dashboard/settings/Settings';
import Profile from '../pages/dashboard/profile/Profile';
import Discover from '../pages/dashboard/discover/Discover';
import Dashboard from '../pages/dashboard/Dashboard';
import Notifications from '../pages/dashboard/notifications/Notifications';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        Component: Auth,
      },
      {
        path: 'dashboard',
        Component: Dashboard,
        children: [
          {
            path: 'home',
            Component: Home,
          },
          {
            path: 'settings',
            Component: Settings,
          },
          {
            path: 'profile/:id',
            Component: Profile,
          },
          {
            path: 'discover',
            Component: Discover,
          },
          {
            path: 'notifications',
            Component: Notifications,
          },
        ],
      },
    ],
  },
]);

export default router;
