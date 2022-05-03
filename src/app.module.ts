import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './songs/song.model';
import { SongsModule } from './songs/song.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { SessionModule } from './sessions/session.module';
import { ParticipantsModule } from './participants/participant.module';
const CONNECTION_STRING = process.env['DATABASE_URL'];
@Module({
  imports: [
    ParticipantsModule,
    SessionModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'adhoc-client'),
    }),
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
