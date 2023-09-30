import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartProduct, CartState } from '../../interfaces';
// import type { RootState } from '../../store';

const enum ConstantsExpenses {
  shipping = 500,
  tax = 0.1,
}

// Define the initial state using that type
const initialState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: ConstantsExpenses.shipping,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = function (): CartState {
  const value = localStorage.getItem('cart');
  if (value) {
    return JSON.parse(value);
  } else {
    return initialState;
  }
};

const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<CartProduct>) => {
      const selectedProductForAdd = action.payload;
      const item = state.cartItems.find(
        (item) => item.cartID === selectedProductForAdd.cartID
      );
      if (item) {
        item.amount += selectedProductForAdd.amount;
      } else {
        state.cartItems.push(selectedProductForAdd);
      }
      state.numItemsInCart += selectedProductForAdd.amount;
      state.cartTotal +=
        +selectedProductForAdd.price * selectedProductForAdd.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Item added to cart!');
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    },
    removeItem: (state, action: PayloadAction<CartProduct>) => {
      const { cartID } = action.payload;
      const selectedProductForRemove = state.cartItems.find(
        (item) => item.cartID === cartID
      )!;
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );
      state.numItemsInCart -= selectedProductForRemove.amount;
      state.cartTotal -=
        +selectedProductForRemove.price * selectedProductForRemove.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed from cart!');
    },
    editItem: (state, action: PayloadAction<CartProduct>) => {
      const { cartID, amount } = action.payload;
      const selectedProductForEdit = state.cartItems.find(
        (item) => item.cartID === cartID
      )!;
      state.numItemsInCart += amount - selectedProductForEdit.amount;
      /* 
        The logic here is to update the total number of items in the cart (state.numItemsInCart) by adjusting it based on the difference between the provided amount and the existing quantity of that item (item.amount). If amount is greater than item.amount, it means that items are being added to the cart. If amount is less than item.amount, it means that items are being removed from the cart. If they are equal, it implies no change to the quantity of that item in the cart.

        The result of the subtraction (amount - item.amount) is then added to the current state.numItemsInCart to reflect the new total number of items in the cart.
      */
      state.cartTotal +=
        +selectedProductForEdit.price *
        (amount - selectedProductForEdit.amount);
      selectedProductForEdit.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated!');
    },
    calculateTotals: (state) => {
      state.tax = ConstantsExpenses.tax * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.cartState.cartItems

export default cartSlice.reducer;
