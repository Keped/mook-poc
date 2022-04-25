import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from './session.model';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session)
    private sessionModel: typeof Session,
  ) {}

  async findAll(): Promise<Session[]> {
    return this.sessionModel.findAll();
  }

  findOne(id: string): Promise<Session> {
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
