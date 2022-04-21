import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/create_song')
  async getCreateSong(): Promise<string> {
    return await this.appService.createSong();
  }

  @Get('/song/:songId')
  async getSong(@Param('songId') songId: string): Promise<string> {
    return await this.appService.getSong(songId);
  }
  @Get('/start_recording/:songId')
  getStartRecordingSong(@Param('songId') songId: string): Promise<string> {
    return this.appService.startRecordingSong(songId);
  }
  // @Get('/stop_recording/:songId')
  // getStopRecordingSong(@Param('songId') songId: string): string {
  //   return this.appService.stopRecordingSong(songId);
  // }
}
