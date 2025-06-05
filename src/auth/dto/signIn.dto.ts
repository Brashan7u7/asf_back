import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Correo electrónico del usuario',
  })
  mail: string;

  @ApiProperty({
    example: 'contraseña123',
    description: 'Contraseña del usuario',
  })
  password: string;
}
