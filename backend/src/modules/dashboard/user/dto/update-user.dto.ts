import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Ricardo', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Navarrete', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'ricardo.navarrete@gmail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}
