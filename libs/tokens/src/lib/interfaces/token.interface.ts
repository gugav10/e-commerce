export interface IToken {
  id: string;
  accessToken: string;
  refreshToken: string;
  deviceId: string;
  userId: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TokenCreationAttributes = Omit<
  IToken,
  'id' | 'updatedAt' | 'createdAt'
>;
