import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Participant } from './participant.model';
import { ParticipantsService } from './participant.service';

@Module({
  imports: [SequelizeModule.forFeature([Participant])],
  exports: [ParticipantsService],
  providers: [ParticipantsService],
})
export class SongsModule {}
