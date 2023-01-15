import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Action } from '../entity';

export class ActionServices {
  actionEntity: Repository<Action>;

  constructor() {
    this.actionEntity = AppDataSource.getRepository(Action);
  }

  async findById(id: number) {
    return this.actionEntity.findOne({ where: { id, } });
  }

  async findAll() {
    return this.actionEntity.find({relations: ['actionType', 'garden']});
  }

  async createAction(schedule: Action) {
    return this.actionEntity.save(schedule);
  }

  async editAAction(id: number, action: Action) {
    await this.actionEntity.update(id, action);
    return this.findById(id);
  }

  async deleteAAction(id: number) {
    await this.actionEntity.delete(id);
  }
}
