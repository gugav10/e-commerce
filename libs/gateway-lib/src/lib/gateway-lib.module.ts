import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GatewayLibService } from './gateway-lib.service';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      // imports: [AuthRpcModule],
      useFactory: (configService: ConfigService) => ({
        server: {
          formatError: (error: GraphQLError): any => {
            const graphQLFormattedError: GraphQLFormattedError = {
              message: error.message,
              extensions: {
                code: error.extensions?.code,
              },
            };
            return graphQLFormattedError;
          },
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
              // {
              //   name: 'auth',
              //   url: configService.get<string>('AUTH_SUBGRAPH_URL'),
              // },
              // {
              //   name: 'notifications',
              //   url: configService.get<string>('NOTIFICATIONS_SUBGRAPH_URL'),
              // },
              // {
              //   name: 'products',
              //   url: configService.get<string>('PRODUCTS_SUBGRAPH_URL'),
              // },
              // {
              //   name: 'targets',
              //   url: configService.get<string>('TARGETS_SUBGRAPH_URL'),
              // },
            ],
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GatewayLibService],
  exports: [GatewayLibService],
})
export class GatewayLibModule {}
