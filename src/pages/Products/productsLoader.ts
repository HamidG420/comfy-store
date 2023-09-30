import { QueryClient } from '@tanstack/react-query';
import { Product, Meta } from '../../interfaces';
import { customFetch } from '../../utils';
import { LoaderFunction } from 'react-router-dom';

const url = '/products';

type FilterParams =
  | 'search'
  | 'category'
  | 'company'
  | 'sort'
  | 'price'
  | 'shipping'
  | 'page';

const allProductsQuery = function (queryParams: {
  search: string;
  category: string;
  company: string;
  sort: string;
  price: string;
  shipping: string;
  page: string;
}) {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'company',
      sort ?? 'a-z',
      price ?? '100000',
      shipping ?? 'false',
      page ?? '1',
    ],
    queryFn: () => customFetch(url, { params: queryParams }),
  };
};

const productsLoader = (queryClient: QueryClient) =>
  async function ({ request }) {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]) as { [k in FilterParams]: string };

    /* 
    - request.url: Returns the URL of request as a string.
    - new URL(request.url): It creates a URL object from that URL string. The URL interface represents an object providing static methods used for creating object URLs.
    - new URL(request.url).searchParams: It extracts the query parameters using the searchParams property.
    - new URL(request.url).searchParams.entries(): It converts the query parameters into an iterable of key-value pairs using the entries() method.
    - ...new URL(request.url).searchParams.entries(): It spreads these key-value pairs into an array.
    - Object.fromEntries([...new URL(request.url).searchParams.entries()]): It uses Object.fromEntries() to create a new object where the key-value   pairs become properties of the object.
    - as { [k in FilterParams]: string }: It asserts the type of object properties from the FilterParams type
  */

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const products: Product[] = response.data.data;
    const meta: Meta = response.data.meta;
    return { products, meta, params };
  } satisfies LoaderFunction;

export default productsLoader;
