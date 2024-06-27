import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/DTO/user/create-user.dto';
import { UpdateUserDto } from 'src/DTO/user/update-user.dto';
import { UpdateResponseDTO } from 'src/DTO/user/update-user-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResponseDTO> {
    const user = await this.findOneUser(id);

    console.log("user", user)

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    console.log(updateUserDto)

    if (updateUserDto.currentPassword && updateUserDto.password) {

      const isPasswordValid = await this.validateUserPassword(updateUserDto.currentPassword, user.password);

      if (!isPasswordValid) {
        throw new Error('Senha atual incorreta');
      }

      user.password = updateUserDto.password

      await this.userRepository.save(user);
    }

    const userData = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      badges: user.badges,
      profileImageUrl: user.profileImageUrl,
    };

    return {
      user: userData,
    };
  }

  async validateUserPassword(password: string, currentPasswordHash: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, currentPasswordHash);
    console.log(isPasswordValid, 'isPasswordValid')
    return isPasswordValid;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
