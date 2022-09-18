import { StatusType } from 'types';

export const COOKIE_KEYS = {
  auth: 'AUTH_KEY',
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN'
}

export const TODO_STATUS: Record<string, StatusType> = {
  ALL: 'All',
  OPEN: 'Open',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
}

export const TODO_STORAGE = 'TODO_STORAGE';

export const StatusOptions = [
  { value: TODO_STATUS.OPEN, label: TODO_STATUS.OPEN },
  { value: TODO_STATUS.PENDING, label: TODO_STATUS.PENDING },
  { value: TODO_STATUS.COMPLETED, label: TODO_STATUS.COMPLETED },
]