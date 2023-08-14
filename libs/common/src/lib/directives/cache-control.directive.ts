import {
  DirectiveLocation,
  GraphQLBoolean,
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLInt,
} from 'graphql';

export const cacheControlDirective = new GraphQLDirective({
  name: 'cacheControl',
  locations: [
    DirectiveLocation.FIELD_DEFINITION,
    DirectiveLocation.OBJECT,
    DirectiveLocation.INTERFACE,
    DirectiveLocation.UNION,
  ],
  args: {
    maxAge: { type: GraphQLInt },
    scope: {
      type: new GraphQLEnumType({
        name: 'CacheControlScope',
        values: {
          PUBLIC: {},
          PRIVATE: {},
        },
      }),
    },
    inheritMaxAge: { type: GraphQLBoolean },
  },
});
