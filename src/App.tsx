// Import React Router Functions
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import React Query Functions
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Import Created queryClient
import queryClient from './queryClient';

// Import ErrorElement For Individual Pages
import { ErrorElement } from './components';

// Import Redux Store
import store from './store';

// Import Pages, Actions and Loaders
import { Cart } from './pages/Cart';
import { Checkout, checkoutAction, checkoutLoader } from './pages/Checkout';
import { Landing, landingLoader } from './pages/Landing';
import { Login, loginAction } from './pages/Login';
import { Register, registerAction } from './pages/Register';
import { Orders, ordersLoader } from './pages/Orders';
import { Products, productsLoader } from './pages/Products';
import { SingleProduct, singleProductLoader } from './pages/SingleProduct';
import { About, Error, HomeLayout } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        id: 'landing',
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: '/products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
        action: checkoutAction(store, queryClient),
        loader: checkoutLoader(store),
      },
      {
        path: '/orders',
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = function (): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
