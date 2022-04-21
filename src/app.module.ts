import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './songs/song.model';
import { SongsModule } from './songs/song.module';
import { SongsService } from './songs/songs.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_URL,
      models: [Song],
      // port: 58586,
      // password: 'password',
      // username: 'postgres',
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
