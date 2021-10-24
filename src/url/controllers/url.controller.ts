import { Body, Controller, Post } from '@nestjs/common';
import { GenerateUrlDto } from '../dto/generate-url.dto';
import { UrlService } from '../url.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('api/url')
export class UrlController {

    constructor(
        private urlService: UrlService
    ){}

    @Post('generate')
    async generateShortUrl(
        @Body() urlData: GenerateUrlDto
    ): Promise<any>{
        const shortUrl = await this.urlService.generateUrl(urlData);
        return {
            shortUrl: process.env.APP_URL + "/" + shortUrl
        }
    }
}
