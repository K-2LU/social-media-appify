"use client";

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = () => {
  // 1. Get login function from context and router for redirection
  const { login } = useContext(AuthContext)!;
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for Validation Errors (Frontend)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  // State for API Errors (Backend)
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // 1. Short Email Validator
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // 2. Password Length Validator
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
    setApiError(null); // Clear previous server errors
    
    // 2. Run validation first
    if (validateForm()) {
      try {
        // 3. Call the backend via Context
        await login({ email, password });
        
        // 4. Redirect on success
        router.push("/feed"); 
      } catch (err: any) {
        // 5. Capture backend errors (e.g. "User not found!" or "Wrong password")
        // Checks if it's an axios error response, otherwise uses generic message
        setApiError(err.response?.data || "Something went wrong");
      }
    }
  };

  return (
    <form className="_social_login_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            variant="login" // Ensure we use the 'login' style variant
            label="Email" 
            type="email" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
              if (apiError) setApiError(null); // Clear global error on type
            }}
            error={errors.email} 
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            variant="login" // Ensure we use the 'login' style variant
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
              if (apiError) setApiError(null); // Clear global error on type
            }}
            error={errors.password} 
          />
        </div>
      </div>

      {/* 6. Display Backend API Errors here */}
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