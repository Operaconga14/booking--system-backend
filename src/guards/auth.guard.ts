import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenUtilsService } from 'src/utils/token.utils.service';

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

    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new UnauthorizedException('No token provided');

    try {
      const token = authHeader.split(' ')[1];
      const decodedToken = this.tokenService.verifyToken(token);
      request['user'] = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
