import { SetMetadata } from "@nestjs/common";

/**
 * Metadata key used to store role information in route handlers
 */
export const ROLE_KEY = 'roles';

/**
 * Custom decorator to specify which roles can access a route
 * Usage: @Roles('admin', 'user')
 * @param roles - Variable number of role strings (e.g., 'admin', 'user')
 * @returns Decorator that sets metadata for the RoleGuard to check
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLE_KEY, roles);