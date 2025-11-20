import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'ricardo.navarrete.soto@gmail.com',
    description: 'Correo electrónico del administrador',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del administrador',
  })
  @IsString()
  @MinLength(6)
  password: string;
}