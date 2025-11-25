"use client"; // Required because we use useState now

import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: 'login' | 'register';
}

export const Input = ({ 
  label, 
  error, 
  className, 
  variant = 'login', 
  type, // We destructure type to handle password logic
  ...props 
}: InputProps) => {

  // 1. State to toggle visibility
  const [showPassword, setShowPassword] = useState(false);

  // 2. Check if this input was intended to be a password field
  const isPassword = type === 'password';

  const styles = {
    login: {
      wrapper: "_social_login_form_input _mar_b14",
      label: "_social_login_label _mar_b8",
      input: "_social_login_input"
    },
    register: {
      wrapper: "_social_registration_form_input _mar_b14",
      label: "_social_registration_label _mar_b8",
      input: "_social_registration_input"
    }
  };

  const currentStyle = styles[variant];

  return (
    <div className={currentStyle.wrapper} style={{ position: 'relative' }}>
      <label className={currentStyle.label}>{label}</label>
      
      <div className="position-relative">
        <input 
          suppressHydrationWarning={true}
          // 3. Toggle between 'text' and 'password'
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`form-control ${currentStyle.input} ${className || ''} ${error ? 'is-invalid' : ''}`} 
          // 4. Add padding to right so text doesn't go behind the icon
          style={isPassword ? { paddingRight: '45px' } : {}}
          {...props} 
        />

        {/* 5. The Eye Icon Button - Only renders if type is password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6c757d',
              zIndex: 10,
              padding: 0,
              display: 'flex',
              alignItems: 'center'
            }}
            tabIndex={-1} // Skips tab focus so user flows naturally to next input
          >
            {showPassword ? (
              // Eye Open Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              // Eye Closed Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <div className="invalid-feedback" style={{ display: 'block' }}>{error}</div>}
    </div>
  );
};