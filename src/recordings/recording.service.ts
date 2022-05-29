import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recording } from './recording.model';

@Injectable()
export class RecordingsService {
  constructor(
    @InjectModel(Recording)
    private recordingModel: typeof Recording,
  ) {}

  async findAll(): Promise<Recording[]> {
    return this.recordingModel.findAll();
  }

  async findAllBySession(
    sessionId: string,
  ): Promise<Record<string, Recording[]>> {
    const all = await this.recordingModel.findAll({
      where: { sessionId },
    });
    const result: Record<string, Recording[]> = {};
    all.forEach((rec) => {
      const isoDate = rec.requestedStartTime.toISOString();
      result[isoDate] = result[isoDate] ? [...result[isoDate], rec] : [rec];
    });
    return result;
  }

  findOne(id: string): Promise<Recording> {
    return this.recordingModel.findOne({
      where: {
        id,
      },
    });
  }
  async create(recordingDetails: {
    sessionId: string;
    participantId: string;
    fileUrl: string;
    requestedStartTime: Date;
    offsetMs: number;
  }) {
    try {
      const newbie = await this.recordingModel.create(recordingDetails);
      return newbie;
    } catch (e) {
      console.warn(e);
      if (e.name === 'SequelizeDatabaseError') {
        await this.recordingModel.sync();
        const newbie = await this.recordingModel.create(recordingDetails);
        return newbie;
      }
    }
  }

  // update(songId: string, updateMap) {
  //   return this.recordingModel.update(updateMap, { where: { id: songId } });
  // }
  // async remove(id: string): Promise<void> {
  //   const user = await this.findOne(id);
  //   await user.destroy();
  // }
}
