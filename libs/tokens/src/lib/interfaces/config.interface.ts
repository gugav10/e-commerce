export interface JwtConfig {
  expiresIn: string;
  refreshIn: string;
  refreshInDays: number;
  accessSecret: string;
  refreshSecret: string;
  issuer: string;
}
