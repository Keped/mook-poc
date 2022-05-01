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

  async startRecording(sessId: string) {
    const { isRecording } = await this.findOne(sessId);
    if (isRecording) return new Error('Recording is in progress');
    const recordingStartTime = Date.now() + 10_000;
    await this.update(sessId, { isRecording: true, recordingStartTime });
  }

  async stopRecording(sessId: string) {
    const { isRecording } = await this.findOne(sessId);
    if (isRecording) return new Error('Recording is in progress');
    const recordingStopTime = Date.now() + 5_000;
    await this.update(sessId, { isRecording: false, recordingStopTime });
  }

  update(sessId: string, updateMap) {
    return this.sessionModel.update(updateMap, { where: { id: sessId } });
  }
}
