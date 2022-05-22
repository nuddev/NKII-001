import { getCookie, setCookies, removeCookies } from "cookies-next";
import APIUtil from "@utils/APIUtil";
import { AuthRequest, AuthResponse } from "@/models/AuthModel";
class AuthService {
  private apiUtil: APIUtil;
  constructor() {
    this.apiUtil = new APIUtil(process.env.NEXT_PUBLIC_BASE_URL_PLAYER || "");
  }
  generateToken(params: AuthRequest): Promise<AuthResponse> {
    return this.apiUtil.post<AuthRequest, AuthResponse>("/token/generate-token/web", params);
  }
  logout() {
    removeCookies("token")
  }
  getUserToken(): string {
    return getCookie("token")?.toString() || "";
  }
  setUserToken(token: string) {
    setCookies("token", token);
  }
}

export default new AuthService();
