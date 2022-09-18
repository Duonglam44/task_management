import React from 'react';
import { Input, InputProps, FormFeedback } from 'reactstrap';
import { FieldPath, Controller, FieldValues, Control } from 'react-hook-form';

import { onChangeInputHook, onBlurInputHook } from 'types';

interface HookInputType<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  onChange?: onChangeInputHook<T>;
  onBlur?: onBlurInputHook<T>;
}

const HookInput = <T extends FieldValues>(props: HookInputType<T>) => {
  const { control, name, onChange, onBlur, ...inputProps } = props || {};

  return (
    <Controller
      control={control}
      name={name}
      render={renderProps => {
        const {
          fieldState: { error },
          field,
        } = renderProps || {};

        return (
          <>
            <Input
              {...field}
              {...inputProps}
              name={name}
              onChange={e => {
                field.onChange(e);
                onChange?.(e, renderProps);
              }}
              onBlur={e => {
                field.onBlur();
                onBlur?.(e, renderProps);
              }}
              invalid={!!error?.message}
            />
            <FormFeedback>{error?.message}</FormFeedback>
          </>
        );
      }}
    />
  );
};

export default HookInput;
