import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { Lesson, RequestBody } from '@naite/types';
import request, { RequestError } from './api.service';
import { useNotification } from '../hooks/useNotification';
import { DeleteResult } from 'typeorm';

type LessonSelect = 'tasks';

interface LessonParams {
  select: LessonSelect;
}

export const useLessons = <T extends Lesson[]>(
  params?: LessonParams
): UseQueryResult<Lesson[]> =>
  useQuery(['lessons'], () => request<T>(`/lessons`, { params }));

export const useLesson = <T extends Lesson>(
  id?: string,
  params?: LessonParams
): UseQueryResult<Lesson> =>
  useQuery(['lessons', id], () => request<T>(`/lessons/${id}`, { params }), {
    enabled: !!id,
  });

export const useAddLesson = (): UseMutationResult<
  Lesson,
  RequestError,
  RequestBody<Lesson>
> => {
  const notification = useNotification();
  const queryClient = useQueryClient();

  return useMutation(
    ['lesson', 'add'],
    (data) => request<Lesson>('/lessons', { method: 'POST', data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lessons']);
        notification({
          status: 'success',
          description: `Lessons successfully created`,
        });
      },
    }
  );
};

export const useDeleteLesson = (): UseMutationResult<
  DeleteResult,
  RequestError,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation(
    ['lessons', 'delete'],
    (lessonId: string) =>
      request<DeleteResult>(`/lessons/${lessonId}`, { method: 'DELETE' }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lessons'], { exact: true });
      },
    }
  );
};
