import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { ordersLoader } from '../pages/Orders';
import store from '../store';
import { LoaderData } from '../utils';
import queryClient from '../queryClient';
day.extend(advancedFormat);

const OrdersList = () => {
  const loader = ordersLoader(store, queryClient);
  const { meta, orders } = (useLoaderData() as LoaderData<typeof loader>)!;

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">Total orders: {meta.pagination.total}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* HEAD */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
