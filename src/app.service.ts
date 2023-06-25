import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  private userId = randomUUID();
  private taskId = randomUUID();
  private projectId = randomUUID();

  public async GetInfo() {
    // await this.prisma.user.create({
    //   data: {
    //     user_id: this.userId,
    //     email: 'test@gmail.com',
    //     name: 'Nome Teste',
    //     password: 'teste123',
    //   },
    // });

    // await this.prisma.project.create({
    //   data: {
    //     name: 'Projeto Teste',
    //     user_id: this.userId,
    //     project_id: this.projectId,
    //   },
    // });

    await this.prisma.task.create({
      data: {
        name: 'Tarefa teste',
        expiration_date: new Date(),
        status: false,
      },
    });
  }
}
