import '../assets/style.css'
import { legacy_createStore as createStore } from 'redux'
//redux solo, esta deprecated

const value = document.getElementById('value') as HTMLSpanElement

//alterando la store, osea el estado global
function counter(state:number,action:{type:string,payload?:number}){

  if(typeof state === 'undefined') return 0 
  if(state===0 && action.type==='DECREMENT') return 0

  switch(action.type){
    case 'INCREMENT': return state+1;
    case 'DECREMENT': return state-1;
    case 'ODD': return state+1;
    case 'ASYNC': return state+1;
    case 'CUSTOM': return state+(action.payload as number)
    default: return state
  }
}

//store
let store = createStore(counter)

//obtener estados luego de un cammbio en el store
function render(){
  value.textContent= store.getState().toString()
}
render()

//subscripcion a los cambios, va ejecutarse cada ves que el store es modificado
store.subscribe(render)

//dispatch para enviar actions y modificar el store
const incrementValue = () => {
  return store.dispatch({type:'INCREMENT'})
}

const decrementValue = () => {
  return store.dispatch({type:'DECREMENT'})
}

const incrementOdd = ():void|{type:string} => {
  if(store.getState()%2!==0) return store.dispatch({type:'ODD'})
}

const incrementAsync = () => {
  setTimeout(()=> {
    return store.dispatch({type:'ASYNC'})
  },2000) 
}

const incrementCustom = (e) => {
  e.preventDefault()
  const input = document.getElementById('custom-input') as HTMLInputElement
  return store.dispatch({type:'CUSTOM',payload:Number(input.value)})
}

const buttonIncrement = document.getElementById('increment') as HTMLButtonElement
buttonIncrement.addEventListener('click', incrementValue)

const buttonDecrement = document.getElementById('decrement') as HTMLButtonElement
buttonDecrement.addEventListener('click', decrementValue)

const buttonOdd = document.getElementById('increment-odd') as HTMLButtonElement
buttonOdd.addEventListener('click', incrementOdd)

const buttonAsync = document.getElementById('increment-async') as HTMLButtonElement
buttonAsync.addEventListener('click', incrementAsync)

const formCustom = document.getElementById('custom-form') as HTMLFormElement
formCustom.addEventListener('submit', incrementCustom)
