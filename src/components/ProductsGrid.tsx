import { Link, useLoaderData } from 'react-router-dom';
import { LoaderData, formatPrice } from '../utils';
import { landingLoader } from '../pages/Landing';
import { productsLoader } from '../pages/Products';
import queryClient from '../queryClient';

const lLoader = landingLoader(queryClient);
const pLoader = productsLoader(queryClient);

const ProductsGrid = () => {
  const { products } = useLoaderData() as LoaderData<
    typeof lLoader | typeof pLoader
  >;
  return (
    <div className="pt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatPrice(price);
        return (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="card w-full bg-neutral shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-neutral-content">{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
