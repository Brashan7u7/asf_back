import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticiaDto {
    @ApiProperty()
    @IsString()
    titulo: string;

    @ApiProperty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsDateString()
    fecha: string;

    @ApiProperty()
    @IsString()
    img_portada: string;
}
