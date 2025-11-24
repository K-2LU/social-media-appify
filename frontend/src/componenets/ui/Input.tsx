import React from 'react';

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
  ...props 
}: InputProps) => {

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
    <div className={currentStyle.wrapper}>
      <label className={currentStyle.label}>{label}</label>
      <input 
        // 1. Add this prop. It tells React: "Ignore if browser extensions add extra attributes (like styles) to this tag."
        suppressHydrationWarning={true}
        className={`form-control ${currentStyle.input} ${className || ''} ${error ? 'is-invalid' : ''}`} 
        {...props} 
      />
      {error && <div className="invalid-feedback" style={{ display: 'block' }}>{error}</div>}
    </div>
  );
};