import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FieldBuilder } from "../../ui/FieldBuilder";
import { RegisterAuth } from "../../../interfaces/auth";
import { Link } from 'react-router-dom';
import '../../../styles/globals.css'
import { AxiosInstance } from '../../../lib/axios';
import { useNavigate } from "react-router-dom";

function RegisterComponent() {
  const [loading,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {handleSubmit,control,formState: { errors }} = useForm<RegisterAuth>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });
  const onsubmit = (values:RegisterAuth) => {
    setLoading(true);
    AxiosInstance.post('/register',values).
    then(res=> {
      navigate('/login');
    })
    .catch(err => {
      // navigate('/register');
    })
    .finally(() => setLoading(false));
  }

  return (
    <div className="login-page">
    <h1 className="display-5 py-2 text-center">Register Form</h1>
    <div className="form">
      <form className="login-form" onSubmit={handleSubmit(onsubmit)} >
        <FieldBuilder
              control={control}
              errors={errors}
              name={"email"}
              type={"text"}
              label={"Email"}
        />
        <FieldBuilder
              control={control}
              errors={errors}
              name={"email"}
              type={"text"}
              label={"Email"}
        />
         <FieldBuilder
              control={control}
              errors={errors}
              name={"password"}
              type={"password"}
              label={"password"}
        />
        <button disabled={loading} >{loading ? '...loading' : 'Register'}</button>
        <p className="message">
           Registered? <Link to="/login">Connect to account</Link>
        </p>
      </form>
    </div>
  </div>
    )
}

export default RegisterComponent