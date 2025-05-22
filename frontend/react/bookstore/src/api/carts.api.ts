import { Cart } from "../models/cart.model";
import { httpClient } from "./http";

interface AddCartParams {
  book_id: number;
  counts: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post("/carts", params);
  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>("/carts");
  return response.data;
};

export const deleteCart = async (cartId: number) => {
  const response = await httpClient.delete(`/carts`, { data: { cartId } });
  console.log(response);
  return response.data;
};
