import { scrypt } from 'crypto';
import { promisify } from 'util';

export const scryptAsync = promisify(scrypt);
