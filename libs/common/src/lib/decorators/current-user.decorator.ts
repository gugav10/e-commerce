import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CContextType } from '@app/common';

export const getCurrentUserByContext = (context: ExecutionContext): any => {
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }

  if (context.getType<CContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.payload;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
);
