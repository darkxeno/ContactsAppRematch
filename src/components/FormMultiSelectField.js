/**
 *
 * FormSelectField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, FormGroup } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';

function FormMultiSelectField({
  options,
  input: { value, onChange, onBlur, ...inputProps },
  label,
  meta: { touched, error },
  ...custom
}) {
  const indexesOptions = {};
  if (options && options.length > 0) {
    options.forEach(o => {
      indexesOptions[o.value] = o;
    });
  }

  return (
    <FormGroup
      helperText={error}
      label={label}
      intent={error ? 'danger' : undefined}
      //style={{ width: '300px', minWidth: '300px', maxWidth: '300px' }}
    >
      <MultiSelect
        shouldDismissPopover={false}
        noResults={<MenuItem disabled={true} text="No results." />}
        popoverProps={{ minimal: true, targetClassName: 'contact-group' }}
        items={options}
        selectedItems={value === '' ? [] : value}
        onItemSelect={opt => {
          if (value.indexOf(opt.value) === -1) {
            onChange([...value, opt.value]);
          } else {
            value.splice(value.indexOf(opt.value), 1);
            onChange(value);
          }
        }}
        tagInputProps={{
          placeholder: 'Select contact groups...',
          fill: true,
          className: 'contact-group',
          onRemove: (opt, index) => {
            if (value && value.length > 0) {
              value.splice(index, 1);
              console.log('deleting opt', opt);
              onChange(value);
            }
          },
        }}
        itemRenderer={(opt, { modifiers, handleClick }) => {
          return (
            <MenuItem
              active={value.indexOf(opt.value) !== -1}
              key={`option-${opt.value}`}
              //label={opt.value}
              text={opt.text}
              onClick={handleClick}
            />
          );
        }}
        tagRenderer={opt => indexesOptions[opt].text}
        {...custom}
      />
    </FormGroup>
  );
}

FormMultiSelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array.isRequired,
};

export default FormMultiSelectField;
