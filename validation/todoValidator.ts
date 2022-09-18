import * as yup from 'yup';

import { TODO_STATUS } from '@constants/common';

export const defaultValues = {
  title: '',
  description: '',
  status: TODO_STATUS.OPEN
}

export const TodoValidator = () =>
  yup
    .object()
    .shape({
      title: yup
        .string()
        .required('Title must not be empty!')
        .max(100, 'Title must be less than 100 characters'),
      description: yup
        .string()
        .required('Description must not be empty!')
        .max(500, 'Description must be less than 500 characters'),
    })
    .required();
