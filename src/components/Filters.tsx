import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { LoaderData } from '../utils';
import { productsLoader } from '../pages/Products';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';
import queryClient from '../queryClient';

const Filters = () => {
  const loader = productsLoader(queryClient);

  const { meta, params } = useLoaderData() as LoaderData<typeof loader>;
  const { search, category, company, sort, price, shipping } = params;
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />

      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={meta.categories}
        size="select-sm"
        defaultValue={category}
      />

      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={company}
      />

      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={['a-z', 'z-a', 'high', 'low']}
        size="select-sm"
        defaultValue={sort}
      />

      {/* Price */}
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={price}
      />

      {/* SHIPPING */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={Boolean(shipping)}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};
export default Filters;
