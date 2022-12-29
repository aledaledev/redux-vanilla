import { store } from "../redux/cart.store"

export default function (){
    const totalQuantity = document.getElementById('total-quantity') as HTMLSpanElement
    if(store.getState().cart.length===0){
     totalQuantity.textContent=`${String(0)}`
   } else { 
     let total = store.getState().cart.map(({quantity}) => quantity).reduce((prev,cur)=> prev + cur) 
     totalQuantity.textContent=`${String(total)}`
   }
 }