export interface User {
  id: number;
  nom: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
} 