
export interface SignUpResponse {
    success: boolean;
    message?: string;
    data?: {
      userId: string;
      name?: string;
      token: string;
      phone?:string|number|null;
      refreshtoken?: string;
    };
  }
  export interface RefreshTokenResponse {
    token: unknown;
    success: boolean;
    data: {
      token: string;
      expiresIn: number;
    };
    message: string;
  }