import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUser, User } from '@naite/types';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public async validateUser({
    email,
    given_name: firstname,
    family_name: lastname,
    picture: image,
  }: GoogleUser): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    if (user) {
      if (user.image !== image) return this.repository.save({ ...user, image });

      return user;
    }

    const newUser = this.repository.create({
      email,
      firstname,
      lastname,
      image,
    });

    return this.repository.save(newUser);
  }

  public async getUser(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
