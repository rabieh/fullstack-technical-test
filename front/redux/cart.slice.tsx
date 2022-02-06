import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {id: undefined, items: []},
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload
    },
    setCartId: (state, action) => {
      state.id = action.payload
    },
    addToCart: (state, action) => {
      const index = state.items.findIndex((item) => item.objectID === action.payload.objectID)
      if (index === -1) state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.objectID === action.payload.objectID)
      if (index !== -1) state.items.splice(index, 1);
    }
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  setCartId,
  setCartItems
} = cartSlice.actions;
