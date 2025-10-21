import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenUtilsService } from 'src/utils/token-utils.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenUtilsService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer '))
            throw new UnauthorizedException('No token provided');

        try {
            const token = authHeader.split(' ')[1];
            const user = this.tokenService.verifyToken(token);
            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}