import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ActionType, ActionTypes } from '../entity';

export class ActionTypeService {
  actionTypeEntity: Repository<ActionType>;

  constructor() {
    this.actionTypeEntity = AppDataSource.getRepository(ActionType);
  }

  async findByType(type: ActionTypes) {
    // @ts-ignore
    return this.actionTypeEntity.findOne({ where: { type: `${type}`, } });
  }

  async findAll() {
    return this.actionTypeEntity.find();
  }
}
