import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label: string;
}


const Select:React.FC<Props> = function({ name, label, ...rest }) {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref:any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option:any) => option.value)
        } else {
          if (!ref.state.value) {
            return ''
          }
          return ref.state.value.value
        }
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        id={fieldName}
        classNamePrefix='react-select'
        {...rest}
      />
      {error && <span className='errorMessage'>{error}</span>}
    </>
  )
}

export default Select