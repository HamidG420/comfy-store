import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';

// For fetching
const productionURL = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionURL,
});

export const formatPrice = function (price: string) {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(+price / 100);

  return dollarsAmount;
};

export const generateAmountOptions = function (number: number) {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={index} value={amount}>
        {amount}
      </option>
    );
  });
};

// useLoaderData Type Safety
export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;
