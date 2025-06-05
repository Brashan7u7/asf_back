import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Indica si el usuario es administrador',
    example: false,
    required: false,
  })
  is_admin?: boolean;

  @ApiProperty({ description: 'Nombre(s) del usuario', example: 'Juan' })
  names: string;

  @ApiProperty({ description: 'Apellido(s) del usuario', example: 'Pérez' })
  lastname: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan.perez@example.com',
  })
  mail: string;

  @ApiProperty({ description: 'Contraseña', example: '12345678' })
  password: string;

  @ApiProperty({ description: 'Edad', example: 30 })
  age: number;

  @ApiProperty({ description: 'Número telefónico', example: '5551234567' })
  phoneNumber: string;

  @ApiProperty({
    description: 'Dirección',
    example: 'Calle Ficticia 123, Ciudad',
  })
  address: string;
}
