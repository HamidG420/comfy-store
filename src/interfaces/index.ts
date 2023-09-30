export interface Product {
  id: number;
  attributes: {
    title: string;
    company: string;
    description: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: string;
    image: string;
    price: string;
    shipping: boolean;
    colors: string[];
  };
}

export interface CartProduct {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
  productColor: string;
}

export interface Meta {
  categories: string[];
  companies: string[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Define a interface for the Cart slice state
export interface CartState {
  cartItems: CartProduct[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
}

export interface User {
  id: number;
  token: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define a interface for the User slice state
export interface UserState {
  user: User | null;
  theme: string;
}

export interface UserActionPayload {
  user: User;
  jwt: string;
}

export interface Order {
  address: string;
  cartItems: CartProduct[];
  chargeTotal: number;
  name: string;
  numItemsInCart: number;
  orderTotal: string;
}

export interface OrderResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      address: string;
      cartItems: CartProduct[];
      createdAt: string;
      numItemsInCart: number;
      orderTotal: string;
      publishedAt: string;
      updatedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
