import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Action, ActionType } from '../entity';

export class ActionServices {
  actionEntity: Repository<Action>;

  constructor() {
    this.actionEntity = AppDataSource.getRepository(Action);
  }

  async findById(id: number) {
    return this.actionEntity.findOne({ where: { id } });
  }

  async findAll() {
    return this.actionEntity.find({ relations: ['actionType', 'garden'] });
  }

  async findByActionTypePending(actionTypeId: number) {
    // return this.actionEntity.find({
    //   where: {actionType}
    // });
    //
    return this.actionEntity
      .createQueryBuilder('action')
      .leftJoinAndSelect('action.actionType', 'actionTypes')
      .where('actionTypes.id = :id', {
        id: actionTypeId,
      })
      .andWhere('action.pending = :pending', { pending: true })
      .getMany();
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
