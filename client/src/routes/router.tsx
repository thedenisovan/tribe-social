import { createBrowserRouter } from 'react-router';
import App from '../App';
import Auth from '../pages/auth/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: Auth,
      },
    ],
  },
]);

export default router;
