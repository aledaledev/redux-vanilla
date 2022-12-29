import "./assets/style.css";
import { store } from "./redux/cart.store";
import fetchData from "./utils/fetchData";

fetchData(1);

const toggleCart = () => {
  const cart = document.getElementById("cart") as HTMLDivElement;
  cart.classList.toggle("hidden");
};

const openCart = document.getElementById("open-cart") as HTMLButtonElement;
openCart.addEventListener("click", toggleCart);

const closeCart = document.getElementById("close-cart") as HTMLButtonElement;
closeCart.addEventListener("click", toggleCart);

const liPages = document.getElementsByTagName('li') as unknown as NodeList
const nodes = Array.prototype.slice.call(liPages,0) 
nodes.forEach((li:HTMLUListElement) => li.addEventListener('click', () => pagination(Number(li.textContent))))
nodes[0].classList.add('underline')

function pagination(page:number){
    if(page===store.getState().page) return
    fetchData(page);
    store.dispatch({type:'SET_PAGE',payload:page})
    if(page===2){
      nodes[0].classList.remove('underline')
      nodes[1].classList.add('underline')
    } else {
      nodes[1].classList.remove('underline')
      nodes[0].classList.add('underline')
    }
}