import './assets/style.css'
import { legacy_createStore as createStore } from 'redux'
import fetchData from './ts/fetchData'

interface ProductProps {
    _id:string,
    name:string,
    description:string,
    price:number,
    category:'mujer'|'hombre'|'niño'|'',
    image:string
}

interface CartProps {
    product:ProductProps,
    quantity:number
}

interface State {
    products: ProductProps[],
    cart: CartProps[],
    total:number,
    page:number
}

type ActionType = {
    type:string,
    payload:any
}

const initialState:State = {
    products:[],
    cart:[],
    total:0,
    page:1
}

//ADD
//REMOVE
//REMOVE_ALL
//CHANGE_PAGE
//SET_PRODUCTS
//SET_TOTAL

function reducer(state = initialState,action:ActionType){
    const inCart = state.cart.some(({product}) => product._id===action.payload)
    const {product,quantity} = state.cart.find(({product}) => product._id===action.payload) || {product:{price:0,_id:'',category:'',description:'',image:'',name:''}, quantity:0}
    const productIndex = state.cart.findIndex(({product}) => product._id===action.payload)
    const currentProduct = state.products.find((product) => product._id===action.payload) as ProductProps

    //agregar if dependiendo de que action venga

    switch(action.type){
        case 'ADD': { 
            const updateCart = [...state.cart]
            updateCart[productIndex]={product,quantity:quantity+1}
            return {...state, "cart":(inCart?updateCart:[...state.cart,{product:currentProduct,quantity:1}])}
            }
        case 'REMOVE': {
            const updateCart = [...state.cart]
            updateCart[productIndex]={product,quantity:quantity-1}
            return {...state, "cart":(quantity>0?updateCart:updateCart.filter(({product}) => product._id!==action.payload))}
        }
        case 'REMOVE_ALL': return []
        case 'SET_PAGE': return []
        case 'SET_PRODUCTS': return {...state, "products":[...action.payload]}
        case 'SET_TOTAL': return []
        default: state
    }

}

export let store = createStore(reducer)

//deletea todo y vuelve a dibujar con cada cambio al store
const render = () => {

    /*const productContainer= document.getElementById('products') as HTMLDivElement
    productContainer.innerHTML=''

    const ul = document.createElement('ul')
    store.getState().products.map(product => {
        const li = document.createElement('li')
        const button = document.createElement('button')
        button.textContent='+'
        button.addEventListener('click',() => {
            store.dispatch({type:'ADD',payload:product._id})
            console.log(store.getState().cart); 
        })
        li.textContent=product.name
        li.appendChild(button)
        ul.appendChild(li)
    })
    productContainer.appendChild(ul)*/

    renderProducts()
    /*renderCart()
    renderTotal()*/
}

store.subscribe(render)

fetchData(1)

function renderProducts(){
    const productsContainer = document.getElementById('products') as HTMLDivElement
    productsContainer.innerText=''
  
    store.getState().products.map(({name, _id:id,category,description,image,price }) => {
  
      const quantity = store.getState().cart.find(({product}) => product._id===id)?.quantity || 0
  
      const card = document.createElement('div')
      const img = document.createElement('img')
      const cardBody = document.createElement('div')
      const title = document.createElement('h5')
      const cardDescription = document.createElement('p')
      const categoryText = document.createElement('p')
      const priceText = document.createElement('p')
      const addToCart = document.createElement('button')
      const buttonContainer = document.createElement('div')
      const buttonAdd = document.createElement('button')
      const buttonRemove = document.createElement('button')
      const display = document.createElement('span')

      img.src=image
      img.className="" 
      card.appendChild(img)
  
      title.textContent=name
      title.className=""
      priceText.textContent=`price: ${price}`
      cardBody.appendChild(title)
      cardBody.appendChild(priceText)
      cardBody.className=""
      card.appendChild(cardBody)
  
      addToCart.innerText='add to cart'
      addToCart.className=''
      buttonAdd.innerText='+'
      buttonAdd.className=''
      buttonRemove.innerText='-'
      buttonRemove.className=''
      display.className=''
      display.textContent=String(quantity)
  
      if(quantity===0){
        buttonContainer.appendChild(addToCart)
        addToCart.addEventListener('click',() => store.dispatch({type:'ADD',payload:id}))
      } else {
        buttonContainer.appendChild(buttonRemove)
        buttonContainer.appendChild(display)
        buttonContainer.appendChild(buttonAdd)
        buttonRemove.addEventListener('click',() => store.dispatch({type:'REMOVE',payload:id}))
        buttonAdd.addEventListener('click',() => store.dispatch({type:'ADD',payload:id}))
      }
      buttonContainer.className="" 
      cardBody.appendChild(buttonContainer)
  
      card.className=""
      card.appendChild(cardBody)
  
      cardDescription.textContent=description
      categoryText.textContent=category
  
      productsContainer.appendChild(card)
      
    })
}