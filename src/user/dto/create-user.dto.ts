import { IsString, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  ape_paterno: string;

  @ApiProperty()
  @IsString()
  ape_materno: string;

  @ApiProperty()
  @IsEmail()
  correo: string;

  @ApiProperty()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsBoolean()
  rol: boolean;
}
