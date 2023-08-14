import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({
        server: {
          formatError: (formattedError: GraphQLError): any => {
            const graphQLFormattedError: GraphQLFormattedError = {
              message: formattedError.message,
              path: formattedError.path,
              extensions: {
                code: formattedError.extensions?.code,
                status: formattedError.extensions?.status,
                errors: formattedError.extensions?.errors,
              },
            };
            return graphQLFormattedError;
          },
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          playground: false,
          cors: true,
          context: function ({ req }) {
            if (req.payload) {
              return {
                authorization: req.headers.authorization,
                payload: JSON.stringify(req.payload),
              };
            }
          },
        },
        gateway: {
          buildService({ url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                request.http.headers.set(
                  'authorization',
                  context.authorization,
                );
                context.payload &&
                  request.http.headers.set('payload', context.payload);
              },
            });
          },
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'auth',
                url: configService.get<string>('AUTH_SUBGRAPH_URL'),
              },
              {
                name: 'products',
                url: configService.get<string>('PRODUCTS_SUBGRAPH_URL'),
              },
              {
                name: 'stocks',
                url: configService.get<string>('STOCKS_SUBGRAPH_URL'),
              },
              {
                name: 'orders',
                url: configService.get<string>('ORDERS_SUBGRAPH_URL'),
              },
            ],
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GatewayLibModule {}
