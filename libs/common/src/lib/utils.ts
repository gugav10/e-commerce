import { ConfigModuleOptions, ConfigObject } from '@nestjs/config';
import { Schema, ZodError } from 'nestjs-zod/z';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  return new Date(result.setDate(result.getDate() + days));
}

export function zodConfigValidation(
  schema: Schema<any>,
): ConfigModuleOptions['validate'] {
  return (config: ConfigObject) => {
    try {
      return schema.parse(config);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Config validation error ${error.message}`);
      }
      throw error;
    }
  };
}

export function composeKey(...args: string[]) {
  return args.join(':');
}

export function deComposeKey(key: string): string[] {
  return key.split(':');
}

export function deComposeKeys(keys: string[]): string[][] {
  const transposedKeys: string[][] = [];
  keys.forEach((key) => {
    const decomposedKey = key.split(':');
    decomposedKey.forEach((value, idx) => {
      if (!transposedKeys[idx]) {
        transposedKeys[idx] = [];
      }
      transposedKeys[idx].push(value);
    });
  });
  return transposedKeys;
}
