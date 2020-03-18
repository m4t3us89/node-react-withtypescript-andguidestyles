import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface Props {
    name: string;
    label: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input:React.FC<InputProps> = function({ name, label, ...rest }) {
  const inputRef = useRef(null)

  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <div>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <div className='errorMessage'>{error}</div>}
    </div>
  )
}

export default Input