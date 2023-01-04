import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Action } from '../entity';

export class ActionServices {
  scheduleEntity: Repository<Action>;

  constructor() {
    this.scheduleEntity = AppDataSource.getRepository(Action);
  }

  async findById(id: number) {
    return this.scheduleEntity.findOne({ where: { id, }, relations: ['daysOfSchedule'] });
  }

  async findAll() {
    return this.scheduleEntity.find({relations: ['actionType', 'garden']});
  }

  async createAction(schedule: Action) {
    return this.scheduleEntity.save(schedule);
  }

  async editAAction(id: number, action: Action) {
    await this.scheduleEntity.update(id, action);
    return this.findById(id);
  }

  async deleteAAction(id: number) {
    await this.scheduleEntity.delete(id);
  }
}
