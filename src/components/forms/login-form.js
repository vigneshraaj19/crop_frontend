import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// internal
import { EyeCut, Lock, UserTwo } from "@svg/index";
import ErrorMessage from "@components/error-message/error";
import { useLoginUserMutation } from "src/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@utils/toast";
import PinInput from 'react-pin-input';

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [passCode,setPassCode] = useState("");
  const [loginUser, { }] = useLoginUserMutation();
  const router = useRouter();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = (data) => {
    loginUser({
      email: data.email,
      password: passCode
    })
      .then((data) => {
        if (data?.error) {
          notifyError(data?.error?.data?.error)
        }
        else {
          notifySuccess("Login successfully");
          router.push("/");
        }
      })
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login__input-wrapper">
        <div className="login__input-item">
          <div className="login__input">
            <input
              {...register("email")}
              name="email"
              type="email"
              placeholder="Enter your email"
              id="email"
            />
            <span>
              <UserTwo />
            </span>
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>

        <PinInput 
      length={4} 
      initialValue=""
      onChange={(value, index) => {
        setPassCode(value.toString());
      }} 
      type="numeric" 
      inputMode="number"
      name="password"
      style={{padding: '10px'}}  
      inputStyle={{borderColor: 'red'}}
      inputFocusStyle={{borderColor: 'blue'}}
      onComplete={(value, index) => {}}
      autoSelect={true}
      regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
    />
        {/* <div className="login__input-item">
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
                {...register("password")}
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                id="password"
              />
              <span>
                <Lock />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <i className="fa-regular fa-eye"></i> : <EyeCut />}
            </span>
            <ErrorMessage message={errors.password?.message} />
          </div>
        </div> */}
      </div>

      <div className="login__option mb-25 d-sm-flex justify-content-between">
        <div className="login__remember">
          <input type="checkbox" id="tp-remember" />
          <label htmlFor="tp-remember">Remember me</label>
        </div>
        <div className="login__forgot">
          <Link href="/forgot">forgot password?</Link>
        </div>
      </div>
      <div className="login__btn">
        <button type="submit" className="tp-btn w-100">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
