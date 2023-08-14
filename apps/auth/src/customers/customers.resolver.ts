import { Resolver } from '@nestjs/graphql';
import { CustomersService, types } from '@app/customers';

@Resolver(() => types.Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}
}
