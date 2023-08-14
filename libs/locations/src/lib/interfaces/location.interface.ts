export interface ILocation {
  id: string;
  cityId: string;
}

export type LocationCreationAttrs = Pick<ILocation, 'cityId'>;
