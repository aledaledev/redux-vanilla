import { store } from "../redux/cart.store";

export default function () {
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