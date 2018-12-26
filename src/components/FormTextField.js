import React from "react";
import { Classes, InputGroup, FormGroup } from "@blueprintjs/core";

console.log('Classes',Classes);

function renderTextField({
  input,
  label,
  placeholder,
  meta: { touched, error },
  ...custom
}) {
  
  return (
    <FormGroup
        helperText={error}
        label={label}
        //labelFor="text-input"
        //labelInfo="(required)"
        intent={touched && error ? 'danger' : undefined}
        style={{ width: '300px' }}
    >    
      <InputGroup
        
        placeholder={placeholder}
        intent={touched && error ? 'danger' : undefined}
        {...input}
        {...custom}
      />
    </FormGroup>
  );
}

export default renderTextField;
