import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { formatPrice, LoaderData } from '../../utils';
import { singleProductLoader } from '.';
import { useAppDispatch } from '../../RTKHooks';
import { addItem } from '../../features/cart/cartSlice';
import { CartProduct } from '../../interfaces';
import ChangeAmountButton from '../../components/ChangeAmountButton';
import queryClient from '../../queryClient';

const SingleProduct = () => {
  const loader = singleProductLoader(queryClient);
  const { product } = (useLoaderData() as LoaderData<typeof loader>)!;
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  /*   
    const amountHandler = function (event: React.ChangeEvent<HTMLSelectElement>) {
    setAmount(+event.target.value);
    }; 
  */

  const dispatch = useAppDispatch();

  const cartProduct: CartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    company,
    productColor,
  };

  const onAddToCartHandler = function () {
    dispatch(addItem(cartProduct));
  };

  const onDecreaseAmountHandler = function () {
    if (amount === 1) {
      return;
    }
    setAmount((prevState) => prevState - 1);
  };

  const onIncreaseAmountHandler = function () {
    if (amount === 20) {
      return;
    }
    setAmount((prevState) => prevState + 1);
  };

  const onAmountChangeHandler = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const inputNumberAmount = +event.target.value;
    if (inputNumberAmount < 1 || inputNumberAmount > 20) {
      alert('Invalid amount');
      setAmount(1);
      return;
    }
    setAmount(+event.target.value);
  };
  return (
    <section>
      <div className="text-xl	breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="font-medium tracking-wider capitalize">Colors</h4>
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`badge w-8 h-8 mr-2 ${
                    color === productColor && 'border-2 border-secondary'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              ))}
            </div>
          </div>

          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs mt-3">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                Amount
              </h4>
            </label>
            <div className="flex w-60">
              <ChangeAmountButton
                sign="-"
                onAmountAmountHandler={onDecreaseAmountHandler}
              />
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={onAmountChangeHandler}
                className="w-1/2 text-center text-xl rounded"
              />
              <ChangeAmountButton
                sign="+"
                onAmountAmountHandler={onIncreaseAmountHandler}
              />
            </div>

            {/* <select
              id="amount"
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={amountHandler}
            >
              {generateAmountOptions(20)}
            </select> */}
          </div>

          {/* CART BTN */}
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={onAddToCartHandler}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
