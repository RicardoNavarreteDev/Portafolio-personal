import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo de quien envía el mensaje',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'juan.perez@gmail.com',
    description: 'Correo electrónico de contacto',
  })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({
    example: 'Hola Ricardo, me gustaría saber más sobre tus servicios.',
    description: 'Contenido del mensaje enviado desde el formulario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El mensaje no puede estar vacío' })
  @MaxLength(1000)
  content: string;
}
