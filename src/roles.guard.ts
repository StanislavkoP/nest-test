import { Injectable, CanActivate, ExecutionContext, SetMetadata, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true;
            
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role));

        return user && user.roles && hasRole();
    }
}

@Injectable()
export class AdminRoleGuard implements CanActivate {
    constructor (private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext):boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role));
        
        if (request.route.path === '/admin/login') return true;
        return user && user.roles && hasRole();
    }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);