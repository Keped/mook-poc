import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from './session.model';

const WAIT_BEFORE_START = 6_666;
const WAIT_BEFORE_END = 10_000;
const PHASE_IDLE = 'idle';
const PHASE_COUNTDOWN = 'count';
const PHASE_RECORDING = 'idle';
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

  sessionPhase(session: Session) {
    const { recordingStartTime, recordingEndTime } = session;
    const now = new Date();
    if (!recordingStartTime) {
      return PHASE_IDLE;
    }
    if (
      (recordingStartTime && !recordingEndTime) ||
      recordingStartTime > recordingEndTime //||
      // (recordingEndTime &&
      //   recordingEndTime.getTime() - now.getTime() < WAIT_BEFORE_END)
    ) {
      if (now < recordingStartTime) {
        return PHASE_COUNTDOWN;
      }
      return PHASE_RECORDING;
    }
    return PHASE_IDLE;
  }

  async startRecording(sessId: string) {
    const session = await this.findOne(sessId);
    const phase = this.sessionPhase(session);
    if ([PHASE_COUNTDOWN, PHASE_RECORDING].includes(phase)) {
      return new Error(`Recording is in progress, currently ${phase}`);
    }
    await this.update(sessId, {
      recordingStartTime: new Date(Date.now() + WAIT_BEFORE_START),
    });
  }

  async stopRecording(sessId: string) {
    const recordingStopTime = Date.now() + WAIT_BEFORE_END;
    await this.update(sessId, { recordingStopTime });
  }

  update(sessId: string, updateMap) {
    return this.sessionModel.update(updateMap, { where: { id: sessId } });
  }
}
