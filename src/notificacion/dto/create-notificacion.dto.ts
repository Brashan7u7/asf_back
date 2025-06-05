import { IsString, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificacionDto {
    @ApiProperty()
    @IsString()
    cambio: string;

    @ApiProperty()
    @IsDateString()
    fecha: string;

    @ApiProperty()
    @IsInt()
    usuario_id: number;

    @ApiProperty()
    @IsInt()
    auditoria_id: number;
}
