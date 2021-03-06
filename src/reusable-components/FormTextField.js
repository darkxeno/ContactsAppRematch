import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormGroup } from '@blueprintjs/core';

function FormTextField({
  input, label, placeholder, meta: { touched, error }, ...custom
}) {
  return (
    <FormGroup
      helperText={error}
      label={label}
      intent={touched && error ? 'danger' : undefined}
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

FormTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  custom: PropTypes.object,
};

FormTextField.defaultProps = {
  custom: {},
};

export default FormTextField;
