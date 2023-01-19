import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Garden, GardenInformation } from '../entity';

export class GardenInformationServices {
  gardenInformationEntity: Repository<GardenInformation>;

  constructor() {
    this.gardenInformationEntity =
      AppDataSource.getRepository(GardenInformation);
  }

  async findById(id: number) {
    return this.gardenInformationEntity.findOne({ where: { id } });
  }

  async findByGardenId(id: number) {
    return this.gardenInformationEntity
      .createQueryBuilder('gardenInformation')
      .leftJoinAndSelect('gardenInformation.garden', 'garden')
      .where('garden.id = :id', {
        id: id,
      })
      .orderBy('gardenInformation.id', 'DESC')
      .getMany();
    // return this.gardenInformationEntity.find({ where: { garden } });
  }

  async findAll() {
    return this.gardenInformationEntity.find({ order: { id: 'DESC' } });
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
