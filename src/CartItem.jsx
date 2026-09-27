import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MAX_QUANTITY,
  removeItem,
  selectTotalCost,
  selectTotalQuantity,
  updateQuantity,
} from "./CartSlice.jsx";
import { formatMoney } from "./catalog.js";
import "./CartItem.css";
export default function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalCost = useSelector(selectTotalCost);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const handleIncrement = (item) =>
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  const handleDecrement = (item) =>
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  const handleRemove = (item) => dispatch(removeItem(item.id));
  const calculateTotalCost = (item) => item.priceCents * item.quantity;
  return (
    <div className="cart-layout">
      <section className="cart-items" aria-label="Plants in your cart">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <span aria-hidden="true">❧</span>
            <h2>Your cart is ready to grow.</h2>
            <p>Explore our plants and find your first favorite.</p>
            <button className="primary-button" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <article className="cart-item" key={item.id} aria-label={item.name}>
              <img
                src={item.image}
                alt={`${item.name} botanical illustration`}
                width="144"
                height="144"
              />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{formatMoney(item.priceCents)} each</p>
                <div className="quantity-controls">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => handleDecrement(item)}
                  >
                    −
                  </button>
                  <output aria-label={`${item.name} quantity`}>
                    {item.quantity}
                  </output>
                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    disabled={item.quantity >= MAX_QUANTITY}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-end">
                <strong>{formatMoney(calculateTotalCost(item))}</strong>
                <button
                  className="delete-button"
                  aria-label={`Delete ${item.name}`}
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
        {cart.length > 0 ? (
          <button className="text-button" onClick={onContinueShopping}>
            ← Continue Shopping
          </button>
        ) : null}
      </section>
      <aside className="order-summary" aria-labelledby="summary-title">
        <p className="eyebrow">THE GOOD GREEN STUFF</p>
        <h2 id="summary-title">Order summary</h2>
        <div className="summary-line">
          <span>Total plants</span>
          <output aria-label="Total plants" aria-live="polite">
            {totalQuantity}
          </output>
        </div>
        <div className="summary-total">
          <span>Total cost</span>
          <output aria-label="Total cost" aria-live="polite">
            {formatMoney(totalCost)}
          </output>
        </div>
        <button
          className="primary-button"
          disabled={cart.length === 0}
          onClick={() =>
            setCheckoutMessage("Coming Soon! Checkout is not available yet.")
          }
        >
          Checkout <span aria-hidden="true">↗</span>
        </button>
        <p className="checkout-message" role="status">
          {checkoutMessage}
        </p>
      </aside>
    </div>
  );
}
