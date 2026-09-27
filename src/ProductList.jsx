import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectTotalQuantity } from "./CartSlice.jsx";
import { formatMoney, plantGroups } from "./catalog.js";
import CartItem from "./CartItem.jsx";
import "./ProductList.css";
export default function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const cart = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();
  const heading = useRef(null);
  const addedToCart = new Set(cart.map((item) => item.id));
  useEffect(() => {
    document.title = `${showCart ? "Your cart" : "Plants"} · Paradise Nursery`;
    heading.current?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [showCart]);
  const handleAddToCart = (plant) => {
    dispatch(addItem({ id: plant.id }));
    setAnnouncement(`${plant.name} added to your cart.`);
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <button
          className="brand"
          onClick={onHomeClick}
          aria-label="Paradise Nursery home"
        >
          <span className="brand-mark" aria-hidden="true">
            ❧
          </span>
          <span>
            Paradise<small>NURSERY</small>
          </span>
        </button>
        <nav aria-label="Main navigation">
          <button onClick={onHomeClick}>Home</button>
          <button
            aria-current={!showCart ? "page" : undefined}
            onClick={() => setShowCart(false)}
          >
            Plants
          </button>
          <button
            className="cart-link"
            aria-current={showCart ? "page" : undefined}
            aria-label={`Cart, ${totalQuantity} plants`}
            onClick={() => setShowCart(true)}
          >
            <svg
              aria-hidden="true"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M2 3h3l3 12h10l3-9H6M9 20h.01M18 20h.01"
                strokeLinecap="round"
              />
            </svg>
            <span>Cart</span>
            <span className="cart-count">{totalQuantity}</span>
          </button>
        </nav>
      </header>
      <main id="main-content" className="shop-content">
        <div className="page-heading">
          <p className="eyebrow">A LITTLE NATURE, EVERY DAY</p>
          <h1 ref={heading} tabIndex={-1}>
            {showCart
              ? "Your growing collection."
              : "Find your next green companion."}
          </h1>
          <p>
            {showCart
              ? "A few good things, ready to take root."
              : "18 favorites. Three collections. Plenty of room to grow."}
          </p>
        </div>
        <p className="sr-only" role="status">
          {announcement}
        </p>
        {showCart ? (
          <CartItem onContinueShopping={() => setShowCart(false)} />
        ) : (
          <>
            <nav className="category-links" aria-label="Plant collections">
              {plantGroups.map((group, index) => (
                <a key={group.category} href={`#collection-${index}`}>
                  {group.category} <span>06</span>
                </a>
              ))}
            </nav>
            {plantGroups.map((group, index) => (
              <section
                className="plant-section"
                key={group.category}
                aria-labelledby={`collection-${index}`}
              >
                <div className="section-heading">
                  <h2 id={`collection-${index}`}>{group.category}</h2>
                  <span>COLLECTION 0{index + 1}</span>
                </div>
                <div className="product-grid">
                  {group.plants.map((plant) => (
                    <article
                      className="product-card"
                      key={plant.id}
                      aria-label={plant.name}
                    >
                      <div className="product-image">
                        <img
                          src={plant.image}
                          alt={`${plant.name} botanical illustration`}
                          width="480"
                          height="480"
                          loading="lazy"
                        />
                      </div>
                      <div className="product-details">
                        <div className="product-title">
                          <h3>{plant.name}</h3>
                          <span>{formatMoney(plant.priceCents)}</span>
                        </div>
                        <p>{plant.description}</p>
                        <button
                          className="add-button"
                          disabled={addedToCart.has(plant.id)}
                          onClick={() => handleAddToCart(plant)}
                          aria-label={
                            addedToCart.has(plant.id)
                              ? `${plant.name} added to cart`
                              : `Add ${plant.name} to cart`
                          }
                        >
                          {addedToCart.has(plant.id)
                            ? "Added to Cart ✓"
                            : "Add to Cart +"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </main>
      <footer className="site-footer">
        <span>Paradise Nursery</span>
        <span>Room for one more leaf.</span>
      </footer>
    </>
  );
}
