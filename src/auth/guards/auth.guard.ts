import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebase: FirebaseService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Cabeçalho Authorization ausente');
    }

    const [prefix, token] = request.headers.authorization?.split(' ');
    
    if (prefix !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token inválido ou mal formatado');
    }

    const isValid = this.firebase.verifyToken(token);
    if (!isValid) {
      throw new UnauthorizedException('Token não autorizado');
    }

    return isValid;
  }
}
