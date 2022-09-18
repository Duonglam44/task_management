import React from 'react';
import { InputProps, FormFeedback } from 'reactstrap';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { FieldPath, Controller, FieldValues, Control } from 'react-hook-form';

import { onChangeInputHook, onBlurInputHook, radioOptions } from 'types';

interface HookRadioType<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  onChange?: onChangeInputHook<T>;
  onBlur?: onBlurInputHook<T>;
  options: radioOptions;
}

const HookRadio = <T extends FieldValues>(props: HookRadioType<T>) => {
  const { options, control, name, onChange, onBlur, ...inputProps } = props || {};

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
            <RadioGroup
              {...field}
              {...inputProps}
            >
              {
                options.map(({ value, label }) => 
                  <FormControlLabel key={`option_${name}_${value}`} value={value} control={<Radio />} label={label} />
                )
              }
            </RadioGroup>
            <FormFeedback>{error?.message}</FormFeedback>
          </>
        );
      }}
    />
  );
};

export default HookRadio;
