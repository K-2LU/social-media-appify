"use client";

import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State to hold error messages
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // 1. Short Email Validator (Regex checks for text@text.text)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // 2. Password Length Validator (Min 8 chars)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Run validation before processing
    if (validateForm()) {
      console.log("Validation passed. Logging in:", email);
      // Add your actual login API call here
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <form className="_social_login_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            label="Email" 
            type="email" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Optional: Clear error as user types
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email} 
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              // Optional: Clear error as user types
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password} 
          />
        </div>
      </div>

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