export interface ProductProps {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: "mujer" | "hombre" | "niño" | "";
    image: string;
  }
  
export interface CartProps {
    product: ProductProps;
    quantity: number;
  }
  
export interface State {
    products: ProductProps[];
    cart: CartProps[];
    total: number;
    page: number;
  }
  
export type ActionType = {
    type: string;
    payload: any;
  };