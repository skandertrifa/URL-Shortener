import { Injectable, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url/entities/url.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(UrlEntity)
    private urlRepository: Repository<UrlEntity>
){}
  async redirect(url: string): Promise<string> {
    const urlEntity = await this.urlRepository.findOneOrFail({
      new:url
    });
    const original = urlEntity.original;
    return original;
  }
}
