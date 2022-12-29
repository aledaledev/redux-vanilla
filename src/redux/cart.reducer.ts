import { ActionType, ProductProps, State } from "../types";

const initialState: State = {
  products: [],
  cart: [],
  total: 0,
  page: 1,
};

export default function cartReducer(state = initialState, action: ActionType) {
  const inCart = state.cart.some(
    ({ product }) => product._id === action.payload
  );
  const { product, quantity } = state.cart.find(
    ({ product }) => product._id === action.payload
  ) || {
    product: {
      price: 0,
      _id: "",
      category: "",
      description: "",
      image: "",
      name: "",
    },
    quantity: 0,
  };
  const productIndex = state.cart.findIndex(
    ({ product }) => product._id === action.payload
  );
  const currentProduct = state.products.find(
    (product) => product._id === action.payload
  ) as ProductProps;

  switch (action.type) {
    case "ADD": {
      const updateCart = [...state.cart];
      updateCart[productIndex] = { product, quantity: quantity + 1 };
      return {
        ...state,
        cart: inCart
          ? updateCart
          : [...state.cart, { product: currentProduct, quantity: 1 }],
      };
    }
    case "REMOVE": {
      const updateCart = [...state.cart];
      updateCart[productIndex] = { product, quantity: quantity - 1 };
      return {
        ...state,
        cart:
          quantity > 1
            ? updateCart
            : updateCart.filter(
                ({ product }) => product._id !== action.payload
              ),
      };
    }
    case "REMOVE_ALL":
      return {
        ...state,
        cart: [...state.cart].filter(
          ({ product }) => product._id !== action.payload
        ),
      };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: [...action.payload] };
    default:
      state;
  }
}
