import "./assets/style.css";
import { legacy_createStore as createStore } from "redux";
import fetchData from "./ts/fetchData";

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: "mujer" | "hombre" | "niño" | "";
  image: string;
}

interface CartProps {
  product: ProductProps;
  quantity: number;
}

interface State {
  products: ProductProps[];
  cart: CartProps[];
  total: number;
  page: number;
}

type ActionType = {
  type: string;
  payload: any;
};

const initialState: State = {
  products: [],
  cart: [],
  total: 0,
  page: 1,
};

//ADD
//REMOVE
//REMOVE_ALL
//CHANGE_PAGE
//SET_PRODUCTS
//SET_TOTAL

function reducer(state = initialState, action: ActionType) {
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

  //agregar if dependiendo de que action venga

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
      return [];
    case "SET_PRODUCTS":
      return { ...state, products: [...action.payload] };
    default:
      state;
  }
}

export let store = createStore(reducer);

//deletea todo y vuelve a dibujar con cada cambio al store
const render = () => {
  renderProducts();
  renderCart();
  renderTotal()
};

store.subscribe(render);

fetchData(1);

function renderProducts() {
  const productsContainer = document.getElementById(
    "products"
  ) as HTMLDivElement;
  productsContainer.innerText = "";

  store
    .getState()
    .products.map(({ name, _id: id, category, description, image, price }) => {
      const quantity =
        store.getState().cart.find(({ product }) => product._id === id)
          ?.quantity || 0;

      const card = document.createElement("div");
      const img = document.createElement("img");
      const cardBody = document.createElement("div");
      const title = document.createElement("h5");
      const cardDescription = document.createElement("p");
      const categoryText = document.createElement("p");
      const priceText = document.createElement("p");
      const addToCart = document.createElement("button");
      const buttonContainer = document.createElement("div");
      const buttonAdd = document.createElement("button");
      const buttonRemove = document.createElement("button");
      const display = document.createElement("span");

      img.src = image;
      img.className = "mx-auto h-52";
      card.appendChild(img);

      title.textContent = name;
      title.className = "text-md font-light";
      priceText.className = "font-medium";
      priceText.textContent = `price: $${price}`;
      cardBody.appendChild(title);
      cardBody.appendChild(priceText);
      cardBody.className = "px-3 py-1";
      card.appendChild(cardBody);

      addToCart.innerText = "add to cart";
      addToCart.className = "bg-green-600 text-white px-2 py-1";
      buttonAdd.innerText = "+";
      buttonAdd.className = "bg-blue-500 text-white w-10 py-1";
      buttonRemove.innerText = "-";
      buttonRemove.className = "bg-blue-500 text-white w-10 py-1";
      display.className = "border border-blue-500 w-10 text-center pt-1";
      display.textContent = String(quantity);

      if (quantity === 0) {
        buttonContainer.appendChild(addToCart);
        addToCart.addEventListener("click", () =>
          store.dispatch({ type: "ADD", payload: id })
        );
      } else {
        buttonContainer.appendChild(buttonRemove);
        buttonContainer.appendChild(display);
        buttonContainer.appendChild(buttonAdd);
        buttonRemove.addEventListener("click", () =>
          store.dispatch({ type: "REMOVE", payload: id })
        );
        buttonAdd.addEventListener("click", () =>
          store.dispatch({ type: "ADD", payload: id })
        );
      }
      buttonContainer.className = "flex justify-center my-2";
      cardBody.appendChild(buttonContainer);

      card.className = "border border-gray-200";
      card.appendChild(cardBody);

      cardDescription.textContent = description;
      categoryText.textContent = category;

      productsContainer.appendChild(card);
    });
}

const toggleCart = () => {
  const cart = document.getElementById("cart") as HTMLDivElement;
  cart.classList.toggle("hidden");
};

const openCart = document.getElementById("open-cart") as HTMLButtonElement;
openCart.addEventListener("click", toggleCart);

const closeCart = document.getElementById("close-cart") as HTMLButtonElement;
closeCart.addEventListener("click", toggleCart);

function renderCart() {
  const cartContainer = document.getElementById(
    "product-cart"
  ) as HTMLDivElement;
  cartContainer.innerText = "";

  if (store.getState().cart.length !== 0) {
    store.getState().cart.map(({ product }) => {
      const { _id: id, image, name, price } = product as ProductProps;
      const quantity = store
        .getState()
        .cart.find(({ product }) => product._id === id)?.quantity;

      const item = document.createElement("div");
      const img = document.createElement("img");
      const productName = document.createElement("p");
      const productInfo = document.createElement("div");
      const productPrice = document.createElement("span");
      const productQuantity = document.createElement("span");
      const buttonGroup = document.createElement("div");
      const removeItem = document.createElement("button");
      const removeIcon = document.createElement("i");
      const buttonAdd = document.createElement("button");
      const buttonRemove = document.createElement("button");

      img.src = image;
      img.className = "w-16";

      productName.textContent = name;
      productName.className = "font-base text-xs";

      productPrice.textContent = `$${price}`;
      productQuantity.textContent = `x${String(quantity)}`;
      productPrice.className = "font-medium";
      productQuantity.className = "font-light text-xs";
      productInfo.className = "flex flex-col items-end";
      productInfo.appendChild(productPrice);
      productInfo.appendChild(productQuantity);

      buttonAdd.textContent = "+";
      buttonRemove.textContent = "-";
      removeIcon.className = "fa-solid fa-trash";
      removeItem.className =
        "bg-red-600 hover:bg-red-700 px-1 text-white hover:text-gray-100";
      buttonAdd.className = "bg-blue-500 hover:bg-blue-700 px-1 text-white";
      buttonRemove.className = "bg-blue-500 hover:bg-blue-700 px-1 text-white";
      buttonGroup.className = "flex flex-col";
      removeItem.appendChild(removeIcon);
      buttonGroup.appendChild(removeItem);
      buttonGroup.appendChild(buttonAdd);
      buttonGroup.appendChild(buttonRemove);
      buttonRemove.addEventListener("click", () =>
        store.dispatch({ type: "REMOVE", payload: id })
      );
      buttonAdd.addEventListener("click", () =>
        store.dispatch({ type: "ADD", payload: id })
      );
      removeItem.addEventListener("click", () =>
        store.dispatch({ type: "REMOVE_ALL", payload: id })
      );

      item.className = "flex justify-between items-center px-2 my-1 gap-2";
      item.appendChild(img);
      item.appendChild(productName);
      item.appendChild(productInfo);
      item.appendChild(buttonGroup);

      cartContainer.appendChild(item);
    });
  } else {
    const advice = document.createElement("div");
    const adviceTitle = document.createElement("h4");
    const icon = document.createElement("i");

    adviceTitle.textContent = "Cart is empty";
    adviceTitle.className = "font-semibold text-2xl my-2";
    icon.className = "fa-solid fa-face-surprise";
    icon.style.transform = "scale(3)";

    advice.className = "flex flex-col items-center gap-4 h-28";
    advice.appendChild(adviceTitle);
    advice.appendChild(icon);

    cartContainer.appendChild(advice);
  }
}

function renderTotal(){
    const totalPrice = document.getElementById('total') as HTMLSpanElement
    if(store.getState().cart.length===0){
      totalPrice.textContent=`$${String(0)}`
    } else { 
      let total = (store.getState().cart.map(({product,quantity}) => product.price*quantity).reduce((prev,cur)=> prev+cur))
      totalPrice.textContent=`$${String(total.toFixed(2))}`
    }
}