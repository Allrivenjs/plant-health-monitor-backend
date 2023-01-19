import { Repository } from 'typeorm';
import { ActionTypeService } from '../actionType';
import { AppDataSource } from '../data-source';
import { Action, ActionTypes, Garden } from '../entity';

export class ActionServices {
  actionEntity: Repository<Action>;
  private actionTypeService;

  constructor() {
    this.actionEntity = AppDataSource.getRepository(Action);
    this.actionTypeService = new ActionTypeService();
  }

  async findById(id: number) {
    return this.actionEntity.findOne({ where: { id } });
  }

  async findActionWithGardenByAction(id: number) {
    return this.actionEntity.findOne({ where: { id }, relations: ['garden'] });
  }

  async findAll() {
    return this.actionEntity.find({ relations: ['actionType', 'garden'] });
  }

  async findByActionTypePending(actionTypeId: number) {
    return this.actionEntity
      .createQueryBuilder('action')
      .leftJoinAndSelect('action.actionType', 'actionTypes')
      .leftJoinAndSelect('action.garden', 'garden')
      .where('actionTypes.id = :id', {
        id: actionTypeId,
      })
      .andWhere('action.pending = :pending', { pending: true })
      .getMany();
  }

  async createAction(action: Action) {
    return this.actionEntity.save(action);
  }

  async createActionWithActionType(garden: Garden, actionTypes: ActionTypes) {
    const actionType = await this.actionTypeService.findByType(actionTypes);

    const action = new Action();
    action.payload = 'test';
    action.garden = garden;
    action.pending = true;
    action.actionType = actionType;

    return this.actionEntity.save(action);
  }

  async editAAction(id: number, action: Action) {
    await this.actionEntity.update(id, action);
    return this.findById(id);
  }

  async deleteAAction(id: number) {
    await this.actionEntity.delete(id);
  }
}
