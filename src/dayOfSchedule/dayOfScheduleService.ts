import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';

import { DayOfSchedule } from '../entity/DayOfSchedule';

export class DayOfScheduleServices {
  scheduleEntity: Repository<DayOfSchedule>;

  constructor() {
    this.scheduleEntity = AppDataSource.getRepository(DayOfSchedule);
  }

  async findById(id: number) {
    return this.scheduleEntity.findOneBy({ id });
  }

  async findAll() {
    return this.scheduleEntity.find();
  }

  async createDayOfSchedule(dayOfSchedule: DayOfSchedule) {
    return this.scheduleEntity.save(dayOfSchedule);
  }

  async editADayOfSchedule(id: number, dayOfSchedule: DayOfSchedule) {
    await this.scheduleEntity.update(id, dayOfSchedule);
    return this.findById(id);
  }

  async deleteADayOfSchedule(id: number) {
    await this.scheduleEntity.delete(id);
  }
}
