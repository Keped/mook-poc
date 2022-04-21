import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
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
}
