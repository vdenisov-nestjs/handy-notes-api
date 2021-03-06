import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { NoteModule } from './modules/note/note.module';
import { TagModule } from './modules/tag/tag.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

import * as config from 'config';
import { IConfigDatabase } from 'src/shared/config-types';

const DATABASE: IConfigDatabase = config.get('database');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DATABASE.connection,
      ...DATABASE.config,
    }),

    AuthModule,
    UserModule,
    NoteModule,
    TagModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,

    { provide: APP_FILTER,        useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR,   useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
