import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { Badge } from 'src/entity/badge.entity';
import { User } from 'src/entity/user.entity';
import { CreateBadgeDto } from 'src/DTO/badge/create-badger.dto';


@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBadge(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const badge = this.badgeRepository.create(createBadgeDto);
    return this.badgeRepository.save(badge);
  }

  async assignRandomBadge(userId: string, type?: 'bronze' | 'prata' | 'ouro'): Promise<{ user: Partial<User>, badge: Badge }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges'],
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const whereClause: any = {
      id: Not(In(user.badges.map(badge => badge.id))),
    };

    if (type) {
      whereClause.type = type;
    }

    const availableBadges = await this.badgeRepository.find({
      where: whereClause,
    });

    if (availableBadges.length === 0) {
      throw new Error('Todos os emblemas desse tipo já foram resgatados');
    }

    const randomIndex = Math.floor(Math.random() * availableBadges.length);
    const badgeToAssign = availableBadges[randomIndex];

    user.badges.push(badgeToAssign);
    await this.userRepository.save(user);

    return {user: user, badge: badgeToAssign};
  }

  async findAllBadges(): Promise<Badge[]> {
    return this.badgeRepository.find();
  }

  async findBadgesByUserId(userId: string): Promise<Badge[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges'],
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user.badges;
  }
}