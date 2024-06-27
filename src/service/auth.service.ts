import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDTO } from 'src/DTO/auth/loginresponse.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService, @InjectRepository(User)
  private readonly userRepository: Repository<User>) {}


  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      return null;
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges'],
    });
    const payload = { email: user.email, sub: user.id };

    const userData: LoginResponseDTO['user'] = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      badges: user.badges,
      profileImageUrl: user.profileImageUrl
    };

    return {
      user: userData,
      accessToken: await this.jwtService.sign(payload),
    };
  }
}
