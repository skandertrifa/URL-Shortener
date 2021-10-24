import { GenerateUrlDto } from './dto/generate-url.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './entities/url.entity';

@Injectable()
export class UrlService {
    
    constructor(
        @InjectRepository(UrlEntity)
        private urlRepository: Repository<UrlEntity>
    ){}

    async generateUrl(generateUrlDto :GenerateUrlDto): Promise<string>
    {      
        // Check if we have already a short url for the service !
        const checkExistance = await this.urlRepository.findOne({
            ...generateUrlDto,
        });
        if ( checkExistance !== undefined){
            return checkExistance.new
        }
        
        const url = this.urlRepository.create({
            ...generateUrlDto,
        }); 

        // Generate a short url
        let generated = this.generateRandomString(5);
        // Checking if the generated url already exists in our database
        let check = await this.urlRepository.findOne({
            'new': generated
        })
        while ( check !== undefined ){
            generated = this.generateRandomString(5);
            check = await this.urlRepository.findOne({
                'new': generated
            })
        }
        url.new = generated;
        await this.urlRepository.save(url);
        // return {
        //     new: url.new
        // }
        return url.new
    }

    // function that generate a random string of length passed 
    generateRandomString(length: number) {
        var result           = '';
        //var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }


    

}
