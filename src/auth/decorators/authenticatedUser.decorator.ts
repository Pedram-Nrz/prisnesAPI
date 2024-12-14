import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAuthenticatedUser {userid:number, email:string}

export const AuthenticatedUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});