import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { RedirectMiddleware } from './middlewares/redirect.middleware';
import { UrlEntity } from './url/entities/url.entity';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature(
    [UrlEntity]
    ),
    UrlModule,
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          "dist/**/*.entity{.ts,.js}"
        ],
        synchronize: true,
        }
    ),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes({
        path: '*', method: RequestMethod.ALL
      });
  }
}
