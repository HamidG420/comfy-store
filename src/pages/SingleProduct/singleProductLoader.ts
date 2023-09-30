import { customFetch } from '../../utils';
import { Product } from '../../interfaces';
import { LoaderFunction } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

const singleProductQuery = function (id: string) {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => {
      const url = `/products/${id}`;
      const response = customFetch(url);
      return response;
    },
  };
};

const singleProductLoader = (queryClient: QueryClient) =>
  async function ({ params }) {
    if (params.id) {
      const response = await queryClient.ensureQueryData(
        singleProductQuery(params.id)
      );
      const product: Product = response.data.data;
      return { product };
    }
    return null;
  } satisfies LoaderFunction;

export default singleProductLoader;
