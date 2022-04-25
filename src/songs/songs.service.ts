import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from './song.model';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song)
    private songModel: typeof Song,
  ) {}

  async findAll(): Promise<Song[]> {
    return this.songModel.findAll();
  }

  findOne(id: string): Promise<Song> {
    return this.songModel.findOne({
      where: {
        id,
      },
    });
  }

  async create() {
    try {
      const newbie = await this.songModel.create();
      return newbie;
    } catch (e) {
      console.warn(e);
      if (e.name === 'SequelizeDatabaseError') {
        await this.songModel.sync();
        const newbie = await this.songModel.create();
        return newbie;
      }
    }
  }

  update(songId: string, updateMap) {
    return this.songModel.update(updateMap, { where: { id: songId } });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
