import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/configs/general.config';
import { validate as isUUID } from 'uuid';

@Injectable()
export class WebhookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token not provided');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new UnauthorizedException('Invalid token');
    }

    const [scheme, token] = parts;

    if (scheme.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Token malformatted');
    }

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload; 

      if (!decodedToken.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      const path = req.baseUrl; 
      const parts = path.split('/');
      const userId = parts[parts.length - 1]; 

      if (isUUID(userId) && userId !== decodedToken.sub) {
        throw new UnauthorizedException('Unauthorized access');
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}