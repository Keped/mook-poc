import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recording } from './recording.model';

@Injectable()
export class RecordingsService {
  constructor(
    @InjectModel(Recording)
    private sessionModel: typeof Recording,
  ) {}

  async findAll(): Promise<Recording[]> {
    return this.sessionModel.findAll();
  }

  findOne(id: string): Promise<Recording> {
    return this.sessionModel.findOne({
      where: {
        id,
      },
    });
  }
  async create() {
    try {
      const newbie = await this.sessionModel.create({
        sessionToken: (Math.random() + 1).toString(36).substring(7),
      });
      return newbie;
    } catch (e) {
      console.warn(e);
      if (e.name === 'SequelizeDatabaseError') {
        await this.sessionModel.sync();
        const newbie = await this.sessionModel.create();
        return newbie;
      }
    }
  }
  update(songId: string, updateMap) {
    return this.sessionModel.update(updateMap, { where: { id: songId } });
  }
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
