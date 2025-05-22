export interface Order {
  id: number;
  createdAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  totalCounts: string;
  totalPrice: number;
}

export interface OrderSheet {
  items: number[];
  totalCounts: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: {
    address: string;
    receiver: string;
    contact: string;
  };
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderApi {
  id: number;
  created_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_counts: string;
  total_price: number;
}

export interface OrderDetailItemApi {
  book_id: number;
  author: string;
  counts: number;
  price: number;
  title: string;
}

export interface OrderListItem extends OrderApi {
  detail: OrderDetailItemApi[];
}
