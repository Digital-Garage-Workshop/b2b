

import { LoginResponse } from "@/types";
import axios from "axios";


const API_BASE_URL = process.env.NEXT_PUBLIC_URL_API;
// const API_BASE_URL = process.env.NEXT_PUBLIC_TEST_URL_API;

export const serverAuthRepository = {
  login: async (phone: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
       email: phone,
        password,
      });
      
      return response.data;
      
    } catch (error: any) {
      console.error("Login API error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  },

  register: async (phone: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
       phone: phone,
        password,
      });
      console.error('tsoom', response.data, API_BASE_URL);
      return response.data;
    } catch (error: any) {
      console.error("Login API error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  },

  changePass: async (phone: string, password: string, confirm_pass:string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/forget/change`, {
       phone: phone,
        password,
        password_confirmation: confirm_pass,
      });
      return response.data;
    } catch (error: any) {
      console.error("Login API error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  },

  signUp: async (userData: {
    email: string;
    uuid: string;
    name: string | null;
    provider?: string;
    image?: string | null;
  }): Promise<LoginResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/social/signup`,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/refresh`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${refreshToken}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: any) {
  //     console.error("Refresh token error:", error.response?.data || error.message);
  //     throw new Error(
  //       error.response?.data?.message || error.message || "Token refresh failed"
  //     );
  //   }
  // },
};
