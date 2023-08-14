import { entities as userEntities } from '@app/users';
import { JwtPayload } from '@app/tokens';

export interface UserPayload {
  data: userEntities.User;
  payload: JwtPayload;
}
