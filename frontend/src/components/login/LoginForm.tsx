"use client";

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = () => {
  const { login } = useContext(AuthContext)!;
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // Email Validator
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password len Validator
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    if (validateForm()) {
      try {
        await login({ email, password });
        
        router.push("/feed"); 
      } catch (err: any) {
        setApiError(err.response?.data || "Something went wrong");
      }
    }
  };

  return (
    <form className="_social_login_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            variant="login"
            label="Email" 
            type="email" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
              if (apiError) setApiError(null);
            }}
            error={errors.email} 
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            variant="login"
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
              if (apiError) setApiError(null);
            }}
            error={errors.password} 
          />
        </div>
      </div>

      {apiError && (
        <div className="alert alert-danger mt-2 mb-4" role="alert">
          {apiError}
        </div>
      )}

      <div className="row">
        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
          <div className="form-check _social_login_form_check">
            <input className="form-check-input _social_login_form_check_input" type="radio" name="remember" id="rememberMe" defaultChecked />
            <label className="form-check-label _social_login_form_check_label" htmlFor="rememberMe">Remember me</label>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
          <div className="_social_login_form_left">
            <p className="_social_login_form_left_para">Forgot password?</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
          <div className="_social_login_form_btn _mar_t40 _mar_b60">
            <Button type="submit">Login now</Button>
          </div>
        </div>
      </div>
    </form>
  );
};