import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './song.model';
import { SongsService } from './songs.service';

@Module({
  imports: [SequelizeModule.forFeature([Song])],
  exports: [SongsService],
  providers: [SongsService],
})
export class SongsModule {}
