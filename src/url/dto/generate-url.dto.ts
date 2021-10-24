import { IsNotEmpty } from "class-validator";

export class GenerateUrlDto{

    @IsNotEmpty()
    original: string;
}