import { store } from "../main"

export default async (page:number) =>  {
    const data = await fetch(`https://peticiones.online/api/products?page=${page}`)
    const json = await data.json()
    store.dispatch({type:'SET_PRODUCTS',payload:json.results})
    return json.results
}