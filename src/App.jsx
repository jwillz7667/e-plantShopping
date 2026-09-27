import { useEffect, useRef, useState } from "react";
import AboutUs from "./AboutUs.jsx";
import ProductList from "./ProductList.jsx";
import "./App.css";
export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const heading = useRef(null);
  useEffect(() => {
    document.title = "Paradise Nursery · A little more green";
    if (!showProductList) heading.current?.focus();
  }, [showProductList]);
  return showProductList ? (
    <ProductList onHomeClick={() => setShowProductList(false)} />
  ) : (
    <main className="landing-page">
      <div className="landing-content">
        <p className="eyebrow">PARADISE NURSERY</p>
        <h1 ref={heading} tabIndex={-1}>
          A little more
          <br />
          <em>green.</em>
        </h1>
        <p className="landing-intro">
          Welcome to Paradise Nursery. Find a plant, make a little space, and
          watch something wonderful grow.
        </p>
        <button
          className="primary-button"
          onClick={() => setShowProductList(true)}
        >
          Get Started <span aria-hidden="true">↗</span>
        </button>
        <AboutUs />
      </div>
      <div className="landing-caption">
        <span>ROOTED IN EVERYDAY JOY</span>
        <span>Plants for your kind of home.</span>
      </div>
    </main>
  );
}
