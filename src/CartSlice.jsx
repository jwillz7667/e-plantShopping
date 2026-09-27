import { createSlice } from "@reduxjs/toolkit";
import { plantsById } from "./catalog.js";
export const MAX_QUANTITY = 99;
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      // Resolve prices from the catalog instead of accepting caller-supplied prices.
      const plant = plantsById.get(action.payload?.id);
      if (!plant) return;
      const item = state.items.find((entry) => entry.id === plant.id);
      if (item) item.quantity = Math.min(item.quantity + 1, MAX_QUANTITY);
      else state.items.push({ ...plant, quantity: 1 });
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload ?? {};
      if (
        !Number.isInteger(quantity) ||
        quantity < 0 ||
        quantity > MAX_QUANTITY
      )
        return;
      const item = state.items.find((entry) => entry.id === id);
      if (!item) return;
      if (quantity === 0)
        state.items = state.items.filter((entry) => entry.id !== id);
      else item.quantity = quantity;
    },
  },
});
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
// Integer cents avoid accumulating floating-point currency errors.
export const selectTotalCost = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.priceCents * item.quantity,
    0,
  );
export default cartSlice.reducer;
