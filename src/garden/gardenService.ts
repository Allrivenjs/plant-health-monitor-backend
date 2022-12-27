import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Garden } from '../entity';

export class GardenServices {
  gardenEntity: Repository<Garden>;

  constructor() {
    this.gardenEntity = AppDataSource.getRepository(Garden);
  }

  async findById(id: number) {
    return this.gardenEntity.findOneBy({ id });
  }

  async findAll() {
    return this.gardenEntity.find();
  }

  async createGarden(garden: Garden) {
    return this.gardenEntity.save(garden);
  }

}
