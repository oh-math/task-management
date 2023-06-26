import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.addConstraint();
  }
  async addConstraint() {
    const result: Array<{}> = await this.$queryRaw`
      SELECT 1
      FROM pg_constraint
      WHERE conname = 'task_project_id_user_id_check'
    `;

    if (result.length === 0) {
      await this.$executeRaw`
        ALTER TABLE task ADD CONSTRAINT task_project_id_user_id_check CHECK (
          (project_id IS NOT NULL AND user_id IS NULL) OR (project_id IS NULL AND user_id IS NOT NULL)
        );
      `;
    }
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
