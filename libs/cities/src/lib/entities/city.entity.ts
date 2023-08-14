import { ICity } from '../interfaces';

export class City implements ICity {
  constructor(public id: string, public title: string) {}
}
