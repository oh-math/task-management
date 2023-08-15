import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { TaskService } from 'src/modules/task/task.service';

export async function checkTaskCreatorAuthorization(
  taskService: TaskService,
  taskId: string,
  userId: string,
) {
  const task = await taskService.findUnique(taskId);
  const { user_id } = task ? task : undefined;

  if (userId !== user_id) {
    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      message: `You don't have the permission to proceed`,
    });
  }
}

