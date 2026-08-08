import client from "./client";

export interface CreateMarketerRequest {
  phone: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

export interface Marketer {
  id: string;
  userId: string;
  phone: string;
  referralCode: string;
  status: string;
  commissionBalance: number;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  createdAt: string;
  updatedAt: string;
}

export const marketerService = {
  async createMarketer(data: CreateMarketerRequest): Promise<Marketer> {
    const response = await client.post("/marketers", data);
    return response.data;
  },

  async getMarketer(id: string): Promise<Marketer> {
    const response = await client.get(`/marketers/${id}`);
    return response.data;
  },

  async getMarketerByCode(code: string): Promise<Marketer> {
    const response = await client.get(`/marketers/code/${code}`);
    return response.data;
  },

  async updateMarketer(id: string, data: Partial<CreateMarketerRequest>): Promise<Marketer> {
    const response = await client.patch(`/marketers/${id}`, data);
    return response.data;
  },
};
