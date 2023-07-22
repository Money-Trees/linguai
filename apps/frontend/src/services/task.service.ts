import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { RequestBody, Task } from '@naite/types';
import request, { RequestError } from './api.service';

export const useUpdateTask = (
  taskId?: string
): UseMutationResult<Task, RequestError, RequestBody<Task>> => {
  const queryClient = useQueryClient();

  return useMutation(
    ['task', taskId, 'update'],
    (data) => request<Task>(`/tasks/${taskId}`, { method: 'POST', data }),
    {
      onSuccess: (task) => {
        queryClient.invalidateQueries(['lessons', task.lessonId]);
      },
    }
  );
};
