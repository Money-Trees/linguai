import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Lesson } from '@naite/types';
import request from './api.service';

export const useLessons = <T extends Lesson[]>(): UseQueryResult<Lesson> =>
  useQuery(['lessons'], () => request<T>('/lessons'));
