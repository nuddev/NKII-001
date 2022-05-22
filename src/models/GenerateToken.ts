export interface GenerateTokenResponse {
    jwttoken: string
    username: string
    role: any[]
    menuAccess: any[]
    message: string
    refreshToken: string
  }

  export interface GenerateTokenRequest {
    username: string
    password:string
  }