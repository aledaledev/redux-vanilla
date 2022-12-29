import { store } from "../redux/cart.store"

export default function (){
    const totalPrice = document.getElementById('total-price') as HTMLSpanElement
    if(store.getState().cart.length===0){
      totalPrice.textContent=`$${String(0)}`
    } else { 
      let total = (store.getState().cart.map(({product,quantity}) => product.price*quantity).reduce((prev,cur)=> prev+cur))
      totalPrice.textContent=`$${String(total.toFixed(2))}`
    }
}