import { Injectable } from '@nestjs/common';
import { randomBytes, timingSafeEqual } from 'crypto';
import { scryptAsync } from './utils';

@Injectable()
export class PasswordService {
  async hashPassword(
    password: string,
    salt: string = randomBytes(10).toString('hex'),
  ): Promise<string> {
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  async compare(
    stringPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    const [hashedPassword, salt] = encryptedPassword.split('.');
    const encryptedBuf = Buffer.from(hashedPassword, 'hex');
    const stringBuf = (await scryptAsync(stringPassword, salt, 64)) as Buffer;

    // prevents early return to prevent timing attack
    return timingSafeEqual(stringBuf, encryptedBuf);
  }
}
