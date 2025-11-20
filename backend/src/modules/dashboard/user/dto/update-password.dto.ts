import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '123456',
    description: 'Contraseña actual del usuario',
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    example: 'NuevaSegura123!',
    description: 'Nueva contraseña del usuario',
  })
  @IsString()
  @MinLength(6, {
    message: 'La nueva contraseña debe tener al menos 6 caracteres',
  })
  newPassword: string;

  @ApiProperty({
    example: 'NuevaSegura123!',
    description: 'Confirmación de la nueva contraseña',
  })
  @IsString()
  @Match('newPassword', { message: 'Las contraseñas nuevas no coinciden' })
  confirmPassword: string;
}
