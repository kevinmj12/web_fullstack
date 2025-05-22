import {
  OrderDetailItemApi,
  OrderListItem,
  OrderSheet,
} from "../models/order.model";
import { httpClient, requestHandler } from "./http";

// export const order = async (orderData: OrderSheet) => {
//   const response = await httpClient.post("/orders", orderData);
//   return response.data;
// };

export const order = async (orderData: OrderSheet) => {
  return await requestHandler("post", "/orders", orderData);
};

export const fetchOrders = async () => {
  const response = await httpClient.get<OrderListItem[]>("/orders");
  return response.data;
};

export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<OrderDetailItemApi[]>(
    `/orders/${orderId}`
  );
  return response.data;
};
