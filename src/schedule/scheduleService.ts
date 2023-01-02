import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Schedule } from '../entity';

export class ScheduleServices {
  scheduleEntity: Repository<Schedule>;

  constructor() {
    this.scheduleEntity = AppDataSource.getRepository(Schedule);
  }

  async findById(id: number) {
    return this.scheduleEntity.findOneBy({ id });
  }

  async findAll() {
    return this.scheduleEntity.find();
  }

  async createSchedule(schedule: Schedule) {
    return this.scheduleEntity.save(schedule);
  }

  async editASchedule(id: number, schedule: Schedule) {
    await this.scheduleEntity.update(id, schedule);
    return this.findById(id);
  }

  async deleteASchedule(id: number) {
    await this.scheduleEntity.delete(id);
  }
}
