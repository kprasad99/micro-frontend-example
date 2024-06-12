import React from 'react';
import type { RouteObject } from 'react-router';
import Home  from './modules/home/home';
import Loading from './components/loading';
import AuthGuard from './guards/authGuard';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );

const App3 = Loadable(React.lazy(() => import('./modules/app3/app3')));

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Home />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <App3 />
          </AuthGuard>
        ),
      },
    ],
  },
];

export default routes;