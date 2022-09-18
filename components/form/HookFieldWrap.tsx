import React from 'react';
import { Label, FormGroup, Col, LabelProps, FormGroupProps, ColProps } from 'reactstrap';

type HookFormWrapType = FormGroupProps & {
  isRequired?: boolean;
  labelName?: string;
  colProps?: ColProps;
  labelProps?: LabelProps;
  contentTooltip?: string;
};

const HookFormWrap: React.FC<HookFormWrapType> = props => {
  const { colProps, labelName, labelProps, isRequired, contentTooltip, children, ...formGroupProps } = props || {};

  return (
    <FormGroup {...formGroupProps}>
      <Label {...labelProps}>
        {labelName}
      </Label>
      <Col {...colProps}>{children}</Col>
    </FormGroup>
  );
};

export default HookFormWrap;
