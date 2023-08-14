import { JwtConfig } from '../interfaces';

export const jwtConfig = (): { jwt: JwtConfig } => {
  return {
    jwt: {
      expiresIn: '1h',
      refreshIn: '7d',
      refreshInDays: 7,
      accessSecret: process.env.JWT_ACCESS_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      issuer: process.env.SERVICE_NAME,
    },
  };
};
