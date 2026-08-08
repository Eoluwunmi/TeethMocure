import client from "./client";

export interface CreateOrderRequest {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  state: string;
  package: string;
  paymentMethod: string;
  marketerCode?: string;
}

export interface Order {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  state: string;
  package: string;
  paymentMethod: string;
  status: string;
  marketerCode?: string;
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  async createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await client.post("/orders", data);
    return response.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await client.get("/orders");
    return response.data;
  },

  async getOrder(id: string): Promise<Order> {
    const response = await client.get(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await client.patch(`/orders/${id}`, { status });
    return response.data;
  },
};
