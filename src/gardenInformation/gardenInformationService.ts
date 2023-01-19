import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { GardenInformation } from '../entity';

export class GardenInformationServices {
  gardenInformationEntity: Repository<GardenInformation>;

  constructor() {
    this.gardenInformationEntity =
      AppDataSource.getRepository(GardenInformation);
  }

  async findById(id: number) {
    return this.gardenInformationEntity.findOne({ where: { id } });
  }

  async findAll() {
    return this.gardenInformationEntity.find();
  }

  async createGardenInformation(gardenInformation: GardenInformation) {
    return this.gardenInformationEntity.save(gardenInformation);
  }

  async editAGardenInformation(
    id: number,
    gardenInformation: GardenInformation
  ) {
    await this.gardenInformationEntity.update(id, gardenInformation);
    return this.findById(id);
  }

  async deleteAGardenInformation(id: number) {
    await this.gardenInformationEntity.delete(id);
  }
}
