import { GraphQLReferenceType } from '../enums';

export type TypeReferencePayload<T> = { __typename: GraphQLReferenceType } & T;
