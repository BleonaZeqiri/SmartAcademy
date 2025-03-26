import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserIdDecorator = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.sub) {
      throw new Error('User object or sub property is not defined');
    }
    return user.sub;
  },
);
