import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ActionType, ActionTypes } from '../entity';

export class ActionTypeService {
  actionTypeEntity: Repository<ActionType>;

  constructor() {
    this.actionTypeEntity = AppDataSource.getRepository(ActionType);
  }

  async findByType(id: ActionTypes) {
    return this.actionTypeEntity.findOne({ where: { id, } });
  }

  async findAll() {
    return this.actionTypeEntity.find();
  }
}
