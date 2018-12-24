/**
 *
 * FormSelectField
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { MenuItem, FormGroup } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

function FormMultiSelectField({
  options,
  input: { value, onChange, onBlur, ...inputProps },
  label,
  meta: { touched, error },
  ...custom
}) {
  console.log('value',value);
  return (
    <FormGroup
        helperText={error}
        label={label}
        intent={error ? 'danger' : undefined}
        style={{ width: '300px' }}
    >    
      <MultiSelect        
        {...inputProps}
        noResults={<MenuItem disabled={true} text="No results." />}
        items={options}
        selectedItems={ value==="" ? [] : value }
        onItemSelect={(opt) => { 
          console.log('opt',opt);         
          //if (value !== optionValue) {
            onChange([...value, opt.value]);
          //}
        }}
        tagInputProps={{ onRemove: (opt)=>{
          
          let newValues = [];
          if( value && value.length > 0 ){
            value.forEach(v=>{
              if(v !== opt){
                newValues.push(v);
              }
            })
          }
          onChange(newValues);
        } }}
        //onBlur={() => onBlur(value)}
        itemRenderer={(opt, { modifiers, handleClick }) => (
          <MenuItem
            active={modifiers.active}
            key={`option-${opt.value}`}
            //label={opt.value}
            text={opt.text}
            onClick={handleClick}
          />
        )}
        tagRenderer={opt => opt}
        {...custom}
      >
        
      </MultiSelect>
    </FormGroup>
  );
}

FormMultiSelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array.isRequired
};

export default FormMultiSelectField;
