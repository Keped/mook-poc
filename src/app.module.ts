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
      host: 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com',
      models: [Song],
      port: 5432,
      database: 'd2emjjpahc6fjn',
      password:
        'c2804650ae5f4cdab211130ae40fcf6511588de61419976f606c69afc308cbd0',
      username: 'dmlsfmwwtuakqb',
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
