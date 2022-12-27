import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity';

export class UserServices {
  userEntity: Repository<User>;

  constructor() {
    this.userEntity = AppDataSource.getRepository(User);
  }

  async findById(id: number) {
    return this.userEntity.findOneBy({id});
  }

  async findByEmail(email: string) {
    return this.userEntity.findOneBy({email});
  }

  async findAllUsers() {
    return this.userEntity.find();
  }

  async createUser(user: User) {
    return this.userEntity.save(user);
  }
};
