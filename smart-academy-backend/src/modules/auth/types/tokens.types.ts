export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  sub: number;
  email: string;
};

export type JwtPayloadRefresh = JwtPayload & { refreshToken: string };

export type UserEmail = {
  id: number;
  email: string;
};

export interface UserPayload {
  id: number;
  email: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
}
