import { store } from "../redux/cart.store";
import { ProductProps } from "../types";

export default function () {
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