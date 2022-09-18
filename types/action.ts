import { ChangeEvent, FocusEvent } from 'react';
import { FieldPath, FieldValues, UseFormStateReturn, ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
export type Action = {
  type: string;
  payload?: Payload;
  error?: any;
};

export type Payload = {
  params?: any;
  callback?: (data?: any) => any;
  response?: any;
};

export type RenderProps<T extends FieldValues> = {
  field?: ControllerRenderProps<T, FieldPath<T>>;
  fieldState?: ControllerFieldState;
  formState?: UseFormStateReturn<T>;
};

export type onChangeInputHook<T extends FieldValues> = (event: ChangeEvent<HTMLInputElement>, renderProps?: RenderProps<T>) => void;
export type onBlurInputHook<T extends FieldValues> = (event: FocusEvent<HTMLInputElement>, renderProps?: RenderProps<T>) => void;
export type optionType = { value: string, label: string }
export type radioOptions = optionType[]