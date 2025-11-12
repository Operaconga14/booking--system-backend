import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenUtilsService } from 'src/utils/token-utils.service';

/**
 * Authentication guard that validates JWT tokens
 * Extracts and verifies the Bearer token from the Authorization header
 * Attaches the decoded user information to the request object
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenUtilsService) { }

    /**
     * Determines if the request can proceed based on JWT token validation
     * @param context - Execution context containing request information
     * @returns Boolean indicating if access is granted
     * @throws UnauthorizedException if token is missing or invalid
     */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        // Check if Authorization header exists and follows Bearer token format
        if (!authHeader || !authHeader.startsWith('Bearer '))
            throw new UnauthorizedException('No token provided');

        try {
            // Extract token from 'Bearer <token>' format
            const token = authHeader.split(' ')[1];
            // Verify token and get user payload
            const user = this.tokenService.verifyToken(token);
            // Attach user information to request for downstream use
            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}