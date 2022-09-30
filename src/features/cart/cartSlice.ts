import { createSlice,PayloadAction,createSelector }  from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


export interface CartState {
    items:{ [productID:string]: number }
}

const initialState: CartState = {
    items:{}
}


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        receivedCart(state,action:PayloadAction<string>){
            const id = action.payload
            if(state.items[id]){
                state.items[id]++
            }else{
                state.items[id] = 1
            }
            console.log(state.items)
        }
    }
})

export const {receivedCart} = cartSlice.actions
export default cartSlice.reducer

export function getNumItems(state:RootState) {
    console.log("calling getNumItems");
    
    let numItems = 0 
    for(let id in state.cart.items){
        numItems += state.cart.items[id]
    }
    return numItems
}

export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        console.log("calling getMemoizedNumItems")
        let numItems = 0 ;
        for(let id in items){
            numItems += items[id]
        }
        return numItems
    }
)