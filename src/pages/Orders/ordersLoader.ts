import { LoaderFunction, redirect } from 'react-router-dom';
import { StoreType } from '../../store';
import { toast } from 'react-toastify';
import { customFetch } from '../../utils';
import { isAxiosError } from 'axios';
import { OrderResponse, User } from '../../interfaces';
import { QueryClient } from '@tanstack/react-query';

const url = '/orders';

type OrdersParams = 'page';

const ordersQuery = function (params: { page: string }, user: User) {
  return {
    queryKey: ['orders', user.username, params.page ? +params.page : 1],
    queryFn: () =>
      customFetch.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

const loader = (store: StoreType, queryClient: QueryClient) =>
  async function ({ request }) {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must logged in to view orders');
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]) as { [k in OrdersParams]: string };

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      const orderRes: OrderResponse = response.data;
      return { orders: orderRes.data, meta: orderRes.meta };
    } catch (error) {
      // check if the error was thrown from axios
      if (isAxiosError(error)) {
        // do something
        // or just re-throw the error
        const errorMessage: string =
          error?.response?.data?.error?.message ||
          'There was an error placing your order';
        toast.error(errorMessage);
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return redirect('/login');
        }
      } else {
        console.log(error);
      }
      return null;
    }
  } satisfies LoaderFunction;

export default loader;
