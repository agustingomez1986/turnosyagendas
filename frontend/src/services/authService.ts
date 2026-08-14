import api from "../api/api";

export interface RegisterData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export async function registerUser(
  data: RegisterData,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register/", data);

  return response.data;
}
