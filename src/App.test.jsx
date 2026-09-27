import { it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App.jsx";
import cartReducer from "./CartSlice.jsx";
it("completes the shopping flow, keeps totals synchronized, and permits re-adding removed plants", async () => {
  const user = userEvent.setup();
  render(
    <Provider store={configureStore({ reducer: { cart: cartReducer } })}>
      <App />
    </Provider>,
  );
  await user.click(screen.getByRole("button", { name: /Get Started/ }));
  expect(screen.getAllByRole("article")).toHaveLength(18);
  await user.click(
    screen.getByRole("button", { name: "Add Snake Plant to cart" }),
  );
  expect(
    screen.getByRole("button", { name: "Snake Plant added to cart" }),
  ).toBeDisabled();
  await user.click(
    screen.getByRole("button", { name: "Add Spider Plant to cart" }),
  );
  await user.click(screen.getByRole("button", { name: "Cart, 2 plants" }));
  expect(screen.getByLabelText("Total cost")).toHaveTextContent("$27.00");
  await user.click(
    screen.getByRole("button", { name: "Increase Snake Plant quantity" }),
  );
  expect(screen.getByLabelText("Total plants")).toHaveTextContent("3");
  expect(screen.getByLabelText("Total cost")).toHaveTextContent("$42.00");
  expect(
    within(screen.getByRole("article", { name: "Snake Plant" })).getByText(
      "$30.00",
    ),
  ).toBeVisible();
  await user.click(
    screen.getByRole("button", { name: "Decrease Snake Plant quantity" }),
  );
  await user.click(screen.getByRole("button", { name: "Delete Spider Plant" }));
  expect(screen.getByLabelText("Total cost")).toHaveTextContent("$15.00");
  await user.click(screen.getByRole("button", { name: /Checkout/ }));
  expect(
    screen.getByText("Coming Soon! Checkout is not available yet."),
  ).toBeVisible();
  await user.click(
    screen.getByRole("button", { name: "Decrease Snake Plant quantity" }),
  );
  expect(screen.getByLabelText("Total cost")).toHaveTextContent("$0.00");
  expect(screen.getByRole("button", { name: /Checkout/ })).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "Continue Shopping" }));
  expect(
    screen.getByRole("button", { name: "Add Snake Plant to cart" }),
  ).toBeEnabled();
  await user.click(
    screen.getByRole("button", { name: "Add Snake Plant to cart" }),
  );
  await user.click(screen.getByRole("button", { name: "Home", exact: true }));
  await user.click(screen.getByRole("button", { name: /Get Started/ }));
  expect(screen.getByRole("button", { name: "Cart, 1 plants" })).toBeVisible();
});
