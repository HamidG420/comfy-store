import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../utils';
import { ordersLoader } from '.';
import store from '../../store';
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from '../../components';
import queryClient from '../../queryClient';

const Orders = () => {
  const loader = ordersLoader(store, queryClient);
  const data = useLoaderData() as LoaderData<typeof loader>;

  if (data) {
    const { meta } = data;
    if (meta.pagination.total < 1) {
      return <SectionTitle text="Please make an order" />;
    }
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
