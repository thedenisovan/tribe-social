import { createBrowserRouter } from 'react-router';
import App from '../App';
import Auth from '../pages/auth/Auth';
import ErrorPage from '../components/layout/ErrorPage';

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
    ],
  },
]);

export default router;
