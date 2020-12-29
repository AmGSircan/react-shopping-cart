import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatchEvent) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatchEvent({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
