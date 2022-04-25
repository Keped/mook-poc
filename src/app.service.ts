import { Injectable } from '@nestjs/common';
import { SongsService } from './songs/songs.service';
@Injectable()
export class AppService {
  constructor(private songservice: SongsService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getSong(songId: string): Promise<string> {
    const song = await this.songservice.findOne(songId);
    return song.toJSON();
  }
  async createSong(): Promise<string> {
    const song = await this.songservice.create();
    return song.id;
  }
  async startRecordingSong(songId: string): Promise<string> {
    await this.songservice.update(songId, { startAt: Date.now() });
    return this.getSong(songId);
  }
}
