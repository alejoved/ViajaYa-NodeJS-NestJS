import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles-guard';
import { Role } from 'src/utils/role';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard(), RolesGuard)
  );
}