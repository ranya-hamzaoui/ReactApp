import { AxiosInstance } from '../lib/axios';
import { LoginAuth } from '../interfaces/auth';
import{lOGIN_ADMIN_BASE_URL} from './request'

export const AuthService = {
    login: async (credentials: LoginAuth) => {
        const response = await AxiosInstance.post(lOGIN_ADMIN_BASE_URL, credentials);
        return response.data;
      },
    register: async (userData: any) => {
        const response = await AxiosInstance.post("/register", userData);
        return response.data;
    },
    logout: async () => {
        const response = await AxiosInstance.post("/logout");
        return response.data;
    }
}