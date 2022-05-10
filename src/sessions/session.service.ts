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

  isRecording(session: Session) {
    const { recordingStartTime, recordingEndTime } = session;
    return (
      (recordingStartTime && !recordingEndTime) ||
      recordingStartTime > recordingEndTime
    );
  }

  async startRecording(sessId: string) {
    const session = await this.findOne(sessId);

    if (this.isRecording(session)) {
      return new Error('Recording is in progress');
    }
    await this.update(sessId, {
      recordingStartTime: new Date(Date.now() + 6666),
    });
  }

  async stopRecording(sessId: string) {
    const recordingStopTime = Date.now() + 5_000;
    await this.update(sessId, { recordingStopTime });
  }

  update(sessId: string, updateMap) {
    return this.sessionModel.update(updateMap, { where: { id: sessId } });
  }
}
