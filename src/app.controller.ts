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

  @Get('/status/:sessId')
  async getStatus(
    @Param('sessId') sessId: string,
  ): Promise<Record<string, unknown>> {
    return await this.appService.getSession(sessId);
  }

  // todo master password
  @Get('/create_session')
  async getCreateSession(): Promise<Record<string, unknown>> {
    return await this.appService.createSession();
  }

  @Post('/add_participant')
  async addParticipant(@Body('token') token: string): Promise<string> {
    return await this.appService.addParticipant(token);
  }

  @Get('/start_recording/:sessId')
  async getStartRecordingSong(@Param('sessId') sessId: string): Promise<void> {
    await this.appService.startRecording(sessId);
  }

  @Get('/stop_recording/:sessId')
  async getStopRecordingSong(@Param('sessId') sessId: string): Promise<void> {
    await this.appService.stopRecording(sessId);
  }

  @Post('/recording_uploaded')
  onRecordingUploaded(
    @Body('sessionId') sessionId: string,
    @Body('playerId') playerId: string,
    @Body('requestedStartTime') requestedStartTime: Date,
    @Body('offsetMs') offsetMs = 0,
    @Body('fileUrl') fileUrl: string,
  ) {
    return this.appService.recordingFinished({
      sessionId,
      playerId,
      fileUrl,
      requestedStartTime,
      offsetMs,
    });
  }
}
