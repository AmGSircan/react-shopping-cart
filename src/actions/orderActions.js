import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER } from "../types";

export const createOrder = (order) => (dispatchEvent) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatchEvent({
        type: CREATE_ORDER,
        payload: data,
      });
      localStorage.clear("cartItems");
      dispatchEvent({
        type: CLEAR_CART,
      });
    });
};

export const clearOrder = () => (dispatchEvent) => {
  dispatchEvent({ type: CLEAR_ORDER });
};
