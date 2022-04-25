import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './session.model';
import { SessionsService } from './session.service';

@Module({
  imports: [SequelizeModule.forFeature([Session])],
  exports: [SessionsService],
  providers: [SessionsService],
})
export class SongsModule {}
