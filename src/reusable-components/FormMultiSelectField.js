import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, FormGroup } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';
import injectSheet from 'react-jss';

const styles = {
  contactGroupMultiSelect: {
    '&.bp3-popover-target': {
      width: '100%',
    },
  },
  contactGroupTagInputProps: {
    '& .bp3-input-ghost': {
      fontSize: '14px',
    },
  },
};

function FormMultiSelectField({
  options,
  input: {
    value, onChange,
  },
  label,
  meta: { touched, error },
  classes,
  ...custom
}) {
  const indexesOptions = {};
  if (options && options.length > 0) {
    options.forEach((o) => {
      indexesOptions[o.value] = o;
    });
  }

  return (
    <FormGroup
      helperText={error}
      label={label}
      intent={touched && error ? 'danger' : undefined}
    >
      <MultiSelect
        shouldDismissPopover={false}
        noResults={<MenuItem disabled text="No results." />}
        popoverProps={{ minimal: true, targetClassName: classes.contactGroupMultiSelect }}
        items={options}
        selectedItems={value === '' ? [] : value}
        onItemSelect={(opt) => {
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
          className: classes.contactGroupTagInputProps,
          onRemove: (opt, index) => {
            if (value && value.length > 0) {
              value.splice(index, 1);
              onChange(value);
            }
          },
        }}
        itemRenderer={(opt, { handleClick }) => (
          <MenuItem
            active={value.indexOf(opt.value) !== -1}
            key={`option-${opt.value}`}
            text={opt.text}
            onClick={handleClick}
          />
        )}
        tagRenderer={(opt) => indexesOptions[opt].text}
        {...custom}
      />
    </FormGroup>
  );
}

FormMultiSelectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(FormMultiSelectField);
