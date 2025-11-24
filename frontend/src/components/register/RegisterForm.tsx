"use client";

import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreed: true
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ... (Keep your existing validateForm function here) ...
  const validateForm = () => {
      // Paste the validateForm logic from the previous step here
      // For brevity, I am assuming you kept the logic identical
      return true; 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registration Successful");
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form className="_social_registration_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            variant="register" // <--- This fixes the error
            label="Email" 
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            variant="register" // <--- This fixes the error
            label="Password" 
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input 
            variant="register" // <--- This fixes the error
            label="Repeat Password" 
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
          />
        </div>
      </div>

      {/* Checkbox and Button sections remain the same */}
      <div className="row">
         {/* ... */}
         <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <div className="form-check _social_registration_form_check">
            <input 
              className={`form-check-input _social_registration_form_check_input ${errors.agreed ? 'is-invalid' : ''}`}
              type="checkbox" 
              name="terms" 
              id="termsCheck" 
              checked={formData.agreed}
              onChange={() => handleChange('agreed', !formData.agreed)}
            />
            <label className="form-check-label _social_registration_form_check_label" htmlFor="termsCheck">
              I agree to terms & conditions
            </label>
            {errors.agreed && <div className="invalid-feedback d-block">{errors.agreed}</div>}
          </div>
        </div>
      </div>
       <div className="row">
        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
          <div className="_social_registration_form_btn _mar_t40 _mar_b60">
            <Button type="submit" className="_social_registration_form_btn_link">
              Register now
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};