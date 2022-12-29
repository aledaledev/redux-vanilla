import cartReducer from "./cart.reducer";
import { legacy_createStore as createStore } from "redux";
import renderProducts from "../ts/renderProducts";
import renderCart from "../ts/renderCart";
import renderTotalPrice from "../ts/renderTotalPrice";
import renderTotalQuantity from "../ts/renderTotalQuantity";

export let store = createStore(cartReducer);

//deletea todo y vuelve a dibujar con cada cambio al store
const render = () => {    
    renderProducts();
    renderCart();
    renderTotalPrice()
    renderTotalQuantity()
  };
  
  store.subscribe(render);