import { Entity, PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity('url')
export class UrlEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    original: string;

    @Column({
        unique: true
    })
    new: string;

}


