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

  async findScheduleByGardenId(gardenId: number) {
    return this.gardenEntity.findOne({ where: {id: gardenId}, relations: ['schedule', 'schedule.daysOfSchedule'] });
  }

  async findAll() {
    return this.gardenEntity.find({relations: ['actions']});
  }

  async createGarden(garden: Garden) {
    return this.gardenEntity.save(garden);
  }

  async editAGarden(id: number, garden: Garden) {
    await this.gardenEntity.update(id, garden);
    return this.findById(id);
  }

  async deleteAGarden(id: number) {
    await this.gardenEntity.delete(id);
  }
}
