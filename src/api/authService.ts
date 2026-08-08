import client from "./client";

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await client.post("/auth/register", data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await client.post("/auth/login", data);
    return response.data;
  },

  async getProfile(): Promise<UserProfile> {
    const response = await client.get("/auth/profile");
    return response.data;
  },
};
