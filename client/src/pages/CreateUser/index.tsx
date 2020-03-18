import React, {useRef, useEffect, useState} from 'react';
import { RouteComponentProps } from 'react-router-dom'
import api from '../../services/api'
// import { Container } from './styles';
import { Scope } from '@unform/core';
import { Form } from '@unform/web'
import { Input, Select } from '../../components/form'
import * as Yup from 'yup'
import  './styles.css';

export default function CreateUser({history}:RouteComponentProps<any>) {
  const formRef:React.MutableRefObject<any> = useRef(null)
  const [citys, setCitys] = useState([])

  useEffect(()=>{
    async function getCitys(){
      try{
        const { data } = await api.get('/citys')
        setCitys(data.map((d:any)=>{return {label:d.name,value:d.id}}))
        formRef.current.getFieldRef('username').focus()
      }catch(err){
        
      }
    }
    
    getCitys()
  },[])

  async function handleSubmit(data:any,{reset}:any){
    try{
      // Remove all previous errors
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        username: Yup.string().required('O username é obrigatório'),
        password: Yup.string().required('O password é obrigatório'),
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email().required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          street: Yup.string().required('A rua é obrigatório'),
          number: Yup.string().required('O número é obrigatório'),
          city: Yup.string().required('A cidade é obrigatória')
        })
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      //console.log(data)
      const response = await api.post('/users' , data)
      console.log(response)
      //history.push('/user')
      //reset()
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
        const { status } = err.response
        if(status === 400){
          alert(err.response.data.message)
          //reset()
          console.log(err.response)
        }
      }
      //console.log('error ', err.r
    }
  }
  

  return (
    <div className="create-user">
       <Form onSubmit={handleSubmit} ref={formRef}>
         <div className="flex">
            <Input name='username' label='Username' />
            <Input name='password' label='Password' type='password' />
            <Input name='name' label='Nome' />
            <Input name='email' label='Email' type='email' />
            <Scope path="address">
              <Input name='street' label='Rua' />
              <Input name='number' label='Número' type='number' />
              <Select name='city' label='Cidade' options={citys}/>
            </Scope>
          </div>
          <div>
            <button type='submit'>Enviar</button>
          </div>
        </Form>
    </div>
  );
}
