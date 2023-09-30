import { ActionFunction, redirect } from 'react-router-dom';
import { StoreType } from '../../store';
import { Order } from '../../interfaces';
import { customFetch, formatPrice } from '../../utils';
import { clearCart } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { QueryClient } from '@tanstack/react-query';

type CheckoutFormKeys = 'name' | 'address';
const url = '/orders';
const action = (store: StoreType, queryClient: QueryClient) =>
  async function ({ request }) {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData) as {
      [k in CheckoutFormKeys]: string;
    };
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const orderItem: Order = {
      name,
      address,
      cartItems,
      numItemsInCart,
      chargeTotal: orderTotal, // In Cents and number type
      orderTotal: formatPrice(orderTotal.toString()), // In Dollars and string type
    };

    try {
      await customFetch.post(
        url,
        { data: orderItem },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());
      toast.success('Order placed successfully');
      return redirect('/orders');
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
  } satisfies ActionFunction;

export default action;
