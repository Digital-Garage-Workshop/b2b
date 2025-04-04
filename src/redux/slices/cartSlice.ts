import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Cart {
  id: string; 
  articleid: string;
}

interface CartState {
  cart: Cart[];
  allTotal: number;
}

const initialState: CartState = {
  cart: [],
  allTotal: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Omit<Cart, 'id'>>) => {
      const cartExists = state.cart.some(item => item.articleid === action.payload.articleid);
      
      if (!cartExists) {
        const newId = Date.now().toString(); 
        state.cart.push({
          id: newId,
          ...action.payload
        });
        state.allTotal = state.cart.length;
      }
    },
    
    removeCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.articleid !== action.payload);
      state.allTotal = state.cart.length;
    },
    
    clearCart: (state) => {
      state.cart = [];
      state.allTotal = 0;
    },
    
    updateAllTotal: (state) => {
      state.allTotal = state.cart.length;
    }
  },
});

export const { addCart, removeCart, clearCart, updateAllTotal } = cartSlice.actions;

export const selectAllCartItems = (state: { cart: CartState }) => state.cart.cart;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.allTotal;
export const selectCartItemById = (state: { cart: CartState }, articleid: string) => 
  state.cart.cart.find(item => item.articleid === articleid);

export default cartSlice.reducer;