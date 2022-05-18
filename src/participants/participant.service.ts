import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from './participant.model';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant)
    private model: typeof Participant,
  ) {}

  async findAll(): Promise<Participant[]> {
    return this.model.findAll();
  }

  findOne(id: string): Promise<Participant> {
    return this.model.findOne({
      where: {
        id,
      },
    });
  }
  async create(sessionId: string) {
    try {
      const newbie = await this.model.create({ sessionId, "name-tbd" });
      return newbie;
    } catch (e) {
      console.warn(e);
      if (e.name === 'SequelizeDatabaseError') {
        await this.model.sync();
        const newbie = await this.model.create();
        return newbie;
      }
    }
  }
  update(songId: string, updateMap) {
    return this.model.update(updateMap, { where: { id: songId } });
  }
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
