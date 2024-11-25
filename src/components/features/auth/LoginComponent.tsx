import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FieldBuilder } from "../../ui/FieldBuilder";
import { LoginAuth } from "../../../interfaces/auth";
import { Link } from 'react-router-dom';
import '../../../styles/globals.css'
import { AxiosInstance } from '../../../lib/axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from '../../../redux/hooks';
import { login } from '../../../redux/reducers/authReducer';


function LoginComponent() {
  const [loading,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {handleSubmit,control,formState: { errors }} = useForm<LoginAuth>({
    defaultValues: {
      email: "rania@gmail.com",
      password: "rania",
    }
  });
  const onsubmit = (values:LoginAuth) => {
    setLoading(true);
    AxiosInstance.post('/login',values).
    then(res=> {
      setLoading(true);
      dispatch(login({ user: res.data.data.user, tokens: {token : res.data.data.token,refreshToken: res.data.data.refreshToken} }));
      navigate('/home');
    })
    .catch(err => {
      setLoading(false)
      return toast.error('inValid Credentials');
    })
    .finally(() => setLoading(false));
  }
  return (
  <div className="login-page">
  <h1 className="display-5 py-2 text-center">Login Form</h1>
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
            name={"password"}
            type={"password"}
            label={"password"}
      />
      <button disabled={loading} >{loading ? '...loading' : 'login'}</button>
      <p className="message">
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </form>
  </div>
</div>
  )
}
export default LoginComponent