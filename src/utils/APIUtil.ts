import { GenerateTokenResponse } from "@/models/GenerateToken";
import axios, { AxiosInstance } from "axios";
import { getCookie, setCookies } from "cookies-next";
interface httpOption {
  loading?: boolean;
  auth?: boolean;
}
abstract class BaseAPI {
  private instance: AxiosInstance;
  constructor(baseURL: string, options?: httpOption) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-type": "application/json",
        ...(options?.auth != false
          ? { Authorization: getCookie("x-token")?.toString() }
          : {}),
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/signin" && err.response) {
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
              const rs = await this.instance.post<GenerateTokenResponse>(
                `${
                  process.env.NEXT_PUBLIC_BASE_URL_PLAYER || ""
                }/auth/refreshtoken`,
                {
                  refreshToken: getCookie("x-token"),
                }
              );
              setCookies("x-token",rs.data.jwttoken);
              this.instance.defaults.headers.common["x-token"] = rs.data.jwttoken;
              return this.instance(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }
        return Promise.reject(err);
      }
    );
  }
  getInstance(): AxiosInstance {
    return this.instance;
  }
  abstract post<D = any, R = any>(url: string, params: D): Promise<R>;
  abstract get<D = any, R = any>(url: string, params: D): Promise<R>;
  abstract put<D = any, R = any>(url: string, params: D): Promise<R>;
  abstract delete<D = any, R = any>(url: string, params: D): Promise<R>;
}
class APIUtil extends BaseAPI {
  constructor(baseURL: string, options?: httpOption) {
    super(baseURL, options);
  }
  async post<D, R>(url: string, params: D): Promise<R> {
    return (await this.getInstance().post<R>(url, params)).data;
  }
  async get<D, R>(url: string, params: D): Promise<R> {
    try {
      return (await this.getInstance().get<R>(url, params)).data;
    } catch (error) {
      throw error;
    }
  }
  async put<D, R>(url: string, params: D): Promise<R> {
    try {
      return (await this.getInstance().put<R>(url, params)).data;
    } catch (error) {
      throw error;
    }
  }
  async delete<D, R>(url: string, params: D): Promise<R> {
    try {
      return (await this.getInstance().delete<R>(url, params)).data;
    } catch (error) {
      throw error;
    }
  }
}
export default APIUtil;
