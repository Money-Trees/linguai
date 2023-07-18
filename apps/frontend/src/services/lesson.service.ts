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

export const useLessons = <T extends Lesson[]>(): UseQueryResult<Lesson[]> =>
  useQuery(['lessons'], () => request<T>('/lessons'));

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
