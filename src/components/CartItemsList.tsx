import { useAppSelector } from '../RTKHooks';
import CartItem from './CartItem';

const CartItemsList = () => {
  const cartItems = useAppSelector((state) => state.cartState.cartItems);
  return (
    <>
      {cartItems.map((item) => (
        <CartItem key={item.cartID} cartItem={item} />
      ))}
    </>
  );
};
export default CartItemsList;
