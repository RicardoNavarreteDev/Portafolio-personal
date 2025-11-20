import { ApiProperty } from '@nestjs/swagger';

class DashboardStats {
  @ApiProperty({ example: 5 })
  posts: number;

  @ApiProperty({ example: 12 })
  messages: number;

  @ApiProperty({ example: 0 })
  projects: number;
}

class DashboardUser {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ricardo.navarrete.soto@gmail.com' })
  email: string;

  @ApiProperty({ example: 'admin' })
  role: string;
}

export class DashboardResponseDto {
  @ApiProperty({ example: 'Bienvenido al Dashboard 🔐' })
  message: string;

  @ApiProperty({ type: DashboardUser })
  user: DashboardUser;

  @ApiProperty({ type: DashboardStats })
  stats: DashboardStats;
}
