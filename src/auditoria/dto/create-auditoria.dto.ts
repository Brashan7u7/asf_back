import { IsString, IsInt, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditoriaDto {
    @ApiProperty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsString()
    observaciones: string;

    @ApiProperty()
    @IsString()
    tipo: string;

    @ApiProperty()
    @IsDateString()
    fecha: string;

    @ApiProperty()
    @IsInt()
    estatus: number;

    @ApiProperty()
    @IsString()
    entidad: string;

    @ApiProperty()
    @IsString()
    activo: string;

    @ApiProperty()
    @IsString()
    resultados: string;

    @ApiProperty()
    @IsBoolean()
    favorito: boolean;

    @ApiProperty()
    @IsInt()
    usuario_id: number;
}
