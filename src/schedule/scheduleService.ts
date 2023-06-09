import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Schedule } from '../entity';

export class ScheduleServices {
  scheduleEntity: Repository<Schedule>;

  constructor() {
    this.scheduleEntity = AppDataSource.getRepository(Schedule);
  }

  async findById(id: number) {
    return this.scheduleEntity.findOne({
      where: { id },
      relations: ['daysOfSchedule'],
    });
  }

  async findAll() {
    // const relations = this.scheduleEntity.metadata.relations.map(m => m.propertyName);
    return this.scheduleEntity.find({
      relations: ['daysOfSchedule'],
    });
  }

  async findGardenByScheduleId(id: number) {
    return this.scheduleEntity.findOne({
      where: { id },
      relations: ['garden'],
    });
  }

  async createSchedule(schedule: Schedule) {
    return this.scheduleEntity.save(schedule);
  }

  async editASchedule(id: number, schedule: Schedule) {
    // delete schedule.garden;
    await this.scheduleEntity.update(id, schedule);
    return this.findById(id);
  }

  async deleteASchedule(id: number) {
    await this.scheduleEntity.delete(id);
  }
}
