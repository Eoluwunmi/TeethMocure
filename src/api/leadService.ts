import client from "./client";

export interface CreateLeadRequest {
  phone: string;
  email?: string;
  source?: string;
  message?: string;
}

export interface Lead {
  id: string;
  phone: string;
  email?: string;
  source?: string;
  message?: string;
  createdAt: string;
}

export const leadService = {
  async createLead(data: CreateLeadRequest): Promise<Lead> {
    const response = await client.post("/leads", data);
    return response.data;
  },
};
