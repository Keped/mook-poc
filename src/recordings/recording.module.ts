import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recording } from './recording.model';
import { RecordingsService } from './recording.service';

@Module({
  imports: [SequelizeModule.forFeature([Recording])],
  exports: [RecordingsService],
  providers: [RecordingsService],
})
export class RecordingsModule {}
