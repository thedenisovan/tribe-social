import { createBrowserRouter } from 'react-router';
import App from '../App';
import Auth from '../pages/auth/Auth';
import ErrorPage from '../components/layout/ErrorPage';
import Home from '../pages/dashboard/home/Home';
import Dashboard from '../pages/dashboard/Dashboard';

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
        ],
      },
    ],
  },
]);

export default router;
