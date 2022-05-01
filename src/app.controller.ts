import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

export class RecordingDto {
  participantId: string;
  sessionId: string;
  startedAt: Date;
  endedAt: Date;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // todo master password
  @Get('/create_session')
  async getCreateSong(): Promise<string> {
    return await this.appService.createSession();
  }

  @Post('/add_participant')
  async addParticipant(
    @Body('sessionId') sessionId: string,
    @Body('token') token: string,
    @Body('name') name: string,
  ): Promise<string> {
    return await this.appService.addParticipant(sessionId, token, name);
  }

  @Get('/start_recording/:sessId')
  getStartRecordingSong(@Param('songId') songId: string): Promise<void> {
    return this.appService.startRecording(songId);
  }

  @Get('/stop_recording/:sessId')
  getStopRecordingSong(@Param('songId') songId: string): Promise<void> {
    return this.appService.stopRecording(songId);
  }
}
