import { QueryClient } from '@tanstack/react-query';
import { Product } from '../../interfaces';
import { customFetch } from '../../utils';
import { LoaderFunction } from 'react-router-dom';

const featuredProductQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),
};

const url = '/products?featured=true';
const landingLoader = (queryClient: QueryClient) =>
  async function () {
    const response = await queryClient.ensureQueryData(featuredProductQuery);
    const products: Product[] = response.data.data;
    return { products };
  } satisfies LoaderFunction;

export default landingLoader;
