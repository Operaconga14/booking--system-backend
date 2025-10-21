import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles || requiredRoles.length === 0)
            return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Changed from request.User to request.user

        if (!user)
            throw new ForbiddenException('You do not have access to this resource');

        const hasRequiredRole = requiredRoles.includes(user.role);

        if (!hasRequiredRole) {
            if (user.role === 'admin' && requiredRoles.includes('user')) {
                throw new ForbiddenException('Admin is rejected from accessing user role');
            } else if (user.role !== 'admin' && requiredRoles.includes('admin')) {
                throw new ForbiddenException('User is not an admin');
            } else {
                throw new ForbiddenException('You do not have access to this resource');
            }
        }

        return true;
    }
}