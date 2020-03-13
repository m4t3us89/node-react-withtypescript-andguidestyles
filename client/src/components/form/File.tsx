import React, {
    //ChangeEvent,
    useRef,
    useEffect,
    useCallback,
    useState
  } from 'react'
  import { useField } from '@unform/core'

interface Props {
    name: string;
    label: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props;
  
const File:React.FC<InputProps> = function ({ name, label, ...rest }) {
    const inputRef = useRef(null)
    const { fieldName, registerField, defaultValue, error } = useField(name)
    const [preview, setPreview] = useState(defaultValue)
  
    const handlePreview = useCallback(e => {
      const file = e.target.files?.[0]
  
      if (!file) {
        setPreview(null)
      }
      const previewURL = URL.createObjectURL(file)
      setPreview(previewURL)
    }, [])
  
    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'files[0]',
        clearValue (ref:any) {
          ref.value = ''
          setPreview(null)
        },
        setValue (_:any, value:any) {
          setPreview(value)
        }
      })
    }, [fieldName, registerField])
  
    return (
      <>
        {label && <label htmlFor={fieldName}>{label}</label>}
        {preview && <img src={preview} alt='Preview' width='100' />}
        <input type='file' ref={inputRef} onChange={handlePreview} {...rest} />
        {error && <span className='errorMessage'>{error}</span>}
      </>
    )
  }

  export default File