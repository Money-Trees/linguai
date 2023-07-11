import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { Auth } from '@naite/types';
import request from './api.service';

export const useLogout = (): UseMutationResult<{ message: string }> => {
  const queryClient = useQueryClient();

  return useMutation(
    ['auth', 'logout'],
    () => request<{ message: string }>('/auth/logout', { method: 'POST' }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['auth']);
      },
    }
  );
};

export const useAuthStatus = (): UseQueryResult<Auth> =>
  useQuery(['auth', 'status'], () => request<Auth>('/auth/status'), {
    retry: false,
  });
