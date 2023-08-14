import { ILocation } from '../interfaces';

export class Location implements ILocation {
  constructor(public id: string, public cityId: string) {}
}
