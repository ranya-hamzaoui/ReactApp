import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '../../../lib/axios';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const TestComponent = () => {

  const {control,handleSubmit,formState: { errors }}= useForm({defaultValues: {
      email : '',
      password: ''
  }});
  const login = async (newData : any) => {
    const response = await AxiosInstance.post("/login", newData);
    return response.data;
  };
  const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn: login,
    onSuccess(data: any, variables: any, context: any) {
        toast.success("Login successful!");
    },
    onError(error: any, variables: any, context: any) {
        toast.error("Login successful!");
    },
  });
  const handleLogin = (values: any) => {
    mutate(values);
  };

  return (
    <div className="container mx-auto col-6">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
       <div>
       <label htmlFor="email">Email</label>
       <Controller
        control={control}
        rules={{
          required: 'L\'email est obligatoire',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Email invalide',
          }
        }}
        name={"email"}
        render={({ field: { onChange, onBlur, value } }) => (
            <input 
               name={"email"}
               type={"text"}
               onChange={onChange}
               onBlur={onBlur}
               value={value}
               className="form-control mb-3"
            />
            )}
           />
          {errors.email && <p className="text-danger">{errors?.email?.message}</p>}
      </div>
      <div>
       <label htmlFor="email">Email</label>
        <Controller
        control={control}
        rules={{
          required: 'Le password est Obligatoire',
          minLength: {
            value: 6,
            message: 'Le mot de passe doit contenir au moins 6 caractères',
          }
        }}
        name={"password"}
        render={({ field: { onChange, onBlur, value } }) => (
            <input 
               name={"password"}
               type={"password"}
               onChange={onChange}
               onBlur={onBlur}
               value={value}
               className="form-control mb-3"
            />
            )}
      />
        {errors.password && <p className="text-danger">{errors?.password?.message}</p>}
       </div>
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? 'Connexion...' : 'Login'}
        </button>
      </form>

      {isError && <p> Error: {error?.message}</p>}
      {isSuccess && <p> Data added successfully!</p>}
    </div>
  );
};
export default TestComponent;
