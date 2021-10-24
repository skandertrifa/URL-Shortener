import { Module } from '@nestjs/common';
import { UrlController } from './controllers/url.controller';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
@Module({
    providers: [UrlService],
    controllers: [UrlController],
    imports: [ TypeOrmModule.forFeature(
      [UrlEntity]
    )]
  })
export class UrlModule {}
