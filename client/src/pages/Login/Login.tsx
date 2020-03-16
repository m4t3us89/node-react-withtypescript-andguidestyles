import React, {useRef} from 'react';
import { RouteComponentProps } from 'react-router-dom'
import api from '../../services/api'
// import { Container } from './styles';
import { Form } from '@unform/web'
import { Input } from '../../components/form/'
import * as Yup from 'yup'
import './styles.css'

interface IErroReponse extends Error{
  response: object
}

export default function Login({history}:RouteComponentProps<any>) {

  const formRef:React.MutableRefObject<any> = useRef(null)


  async function handleSubmit(data:any,{reset}:any){
    try{
      // Remove all previous errors
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        username: Yup.string().required('O username é obrigatório'),
        password: Yup.string().required('O password é obrigatório'),
      })
      await schema.validate(data, {
        abortEarly: false
      })


      await api.post('authenticate' , data)
      history.push('/user')
      reset()
      //formRef.current.getFieldRef('username').focus()
    }catch(err){
 
      if (err instanceof Yup.ValidationError) {
        const validationErrors:any = {}
        const errors = err.inner
        errors.forEach(error => {
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
        formRef.current.getFieldRef(errors[0].path).focus()
      }else{
        alert(err.response.data.message)
        reset()
      }
      //console.log('error ', err.response)
    }
  }

  return (
    <div className="login">
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name='username' label='Username' />
          <Input name='password' label='Password' type='password' />
          <button type='submit'>Enviar</button>
        </Form>
        <small><span style={{ cursor: 'pointer' }} onClick={()=>history.push('/ahudfhsd')}>Não tem conta? Clique aqui</span></small>
    </div>
  );
}

