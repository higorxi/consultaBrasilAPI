import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import { SECRET_KEY } from 'src/configs/general.config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Entrei no adminMiddleware")
      const authHeader  = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException('Token not provided');
      }
  
      const parts = authHeader.split(' ');

      if (parts.length !== 2) throw new UnauthorizedException('Invalid token');

      const [scheme, token] = parts;
  
      if (scheme.toLowerCase() !== 'bearer')
          throw new UnauthorizedException('Token malformatted');
    
      const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload; 
      
      const user = await this.userService.findOneUser(decoded.sub);

      if (!user || user.role !== 'admin') {
        throw new UnauthorizedException('Only admins can access this resource');
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
