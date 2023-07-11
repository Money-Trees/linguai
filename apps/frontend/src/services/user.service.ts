import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { RequestBody, User } from '@naite/types';
import { DeleteResult } from 'typeorm';
import { useNotification } from '../hooks/useNotification';
import request, { RequestError } from './api.service';
import { useAuthStatus } from './auth.service';

export const useUser = (userId?: string): UseQueryResult<User> =>
  useQuery(['users', userId], () => request<User>(`/users/${userId}`), {
    enabled: !!userId,
  });

export const useAuthUser = (): UseQueryResult<User> => {
  const { data } = useAuthStatus();
  const userId = data?.userId;

  return useUser(userId);
};

export const useUsers = <T extends User[]>(): UseQueryResult<T> =>
  useQuery(['users', 'all'], () => request<T>('/users'));

export const useAddUser = (): UseMutationResult<
  User,
  RequestError,
  RequestBody<User>
> => {
  const notification = useNotification();
  const queryClient = useQueryClient();

  return useMutation(
    ['users', 'add'],
    (data) => request<User>('/users', { method: 'POST', data }),
    {
      onSuccess: ({ firstname }) => {
        queryClient.invalidateQueries(['users']);
        notification({
          status: 'success',
          description: `${firstname} successfully created`,
        });
      },
    }
  );
};

export const useDeleteUser = (): UseMutationResult<
  DeleteResult,
  RequestError,
  string
> => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation(
    ['users', 'delete'],
    (userId: string) =>
      request<DeleteResult>(`/users/${userId}`, { method: 'DELETE' }),
    {
      onSuccess: () => {
        notification({
          status: 'success',
          description: `Successfully deleted`,
        });
        queryClient.invalidateQueries(['users']);
      },
    }
  );
};

export const useEditUser = (
  userId?: string
): UseMutationResult<User, RequestError, Partial<RequestBody<User>>> => {
  const queryClient = useQueryClient();
  const notification = useNotification();

  return useMutation(
    ['users', userId, 'update'],
    (data) => request<User>(`/users/${userId}`, { method: 'PATCH', data }),
    {
      onSuccess: (user) => {
        notification({
          status: 'success',
          description: `${user.firstname} ${user.lastname} successfully updated`,
        });
        queryClient.invalidateQueries(['users']);
      },
    }
  );
};
