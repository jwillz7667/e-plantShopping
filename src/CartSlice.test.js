import { describe, expect, it } from "vitest";
import reducer, {
  addItem,
  removeItem,
  updateQuantity,
  selectTotalCost,
  selectTotalQuantity,
  MAX_QUANTITY,
} from "./CartSlice.jsx";
import { plantGroups } from "./catalog.js";
const wrap = (cart) => ({ cart });
describe("cart invariants", () => {
  it("calculates quantities and currency through additions, edits, and removals", () => {
    let state = reducer(
      undefined,
      addItem({ id: "snake-plant", priceCents: 1 }),
    );
    state = reducer(state, addItem({ id: "spider-plant" }));
    state = reducer(state, updateQuantity({ id: "snake-plant", quantity: 3 }));
    expect(selectTotalQuantity(wrap(state))).toBe(4);
    expect(selectTotalCost(wrap(state))).toBe(5700);
    state = reducer(state, removeItem("spider-plant"));
    expect(selectTotalCost(wrap(state))).toBe(4500);
    state = reducer(state, updateQuantity({ id: "snake-plant", quantity: 0 }));
    expect(state.items).toEqual([]);
  });
  it("ignores unknown plants and malformed quantities and caps duplicates", () => {
    let state = reducer(undefined, addItem({ id: "unknown" }));
    expect(state.items).toEqual([]);
    state = reducer(state, addItem({ id: "snake-plant" }));
    for (const quantity of [-1, 1.5, NaN, Infinity, "2", MAX_QUANTITY + 1]) {
      expect(
        reducer(state, updateQuantity({ id: "snake-plant", quantity })),
      ).toEqual(state);
    }
    state = reducer(
      state,
      updateQuantity({ id: "snake-plant", quantity: MAX_QUANTITY }),
    );
    state = reducer(state, addItem({ id: "snake-plant" }));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(MAX_QUANTITY);
  });
  it("provides three collections of six distinct plants", () => {
    expect(plantGroups).toHaveLength(3);
    for (const group of plantGroups) expect(group.plants).toHaveLength(6);
    expect(
      new Set(plantGroups.flatMap((group) => group.plants).map((p) => p.id))
        .size,
    ).toBe(18);
  });
});
