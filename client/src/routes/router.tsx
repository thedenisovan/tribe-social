import { createBrowserRouter } from 'react-router';
import App from '../App';
import Auth from '../pages/auth/Auth';
import Signin from '../pages/auth/sections/Signin';
import Signup from '../pages/auth/sections/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: Auth,
        children: [
          { index: true, Component: Signin },
          { path: 'signup', Component: Signup },
        ],
      },
    ],
  },
]);

export default router;
