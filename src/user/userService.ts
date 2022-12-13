import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity';

export class UserServices {
  userEntity: Repository<User>;

  constructor() {
    this.userEntity = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string) {
    return this.userEntity.findOneBy({email});
  }
};