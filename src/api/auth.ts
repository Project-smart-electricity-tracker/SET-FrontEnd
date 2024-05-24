import apiClient from './axios';
import { Response } from '../models/response';
import {jwtDecode} from 'jwt-decode';
import { DecodeToken } from '../models/decode_token';

// interface LoginResponse {
//   access_token: string;
//   refresh_token: string;
// }

export const login = async (username: string, password: string): Promise<Response> => {
  const response = await apiClient.post<Response>('/login', { username, password });
  localStorage.setItem('access_token', response.data.data.access_token);
  localStorage.setItem('refresh_token', response.data.data.refresh_token);
  const decoded: DecodeToken = jwtDecode(response.data.data.access_token);
  localStorage.setItem('user_role', decoded.role);
  localStorage.setItem('user_username', decoded.username);
  localStorage.setItem('user_name', decoded.name);
  localStorage.setItem('user_exp', decoded.exp.toString());
  return response.data;
};

export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refresh_token');
  await apiClient.post('/logout', { refresh_token: refreshToken });
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_role');
};

export const checkToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token found');
    const response = await apiClient.get('/check-token');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
