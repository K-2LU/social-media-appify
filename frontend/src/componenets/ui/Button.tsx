import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'social';
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const baseClass = variant === 'primary' 
    ? '_social_login_form_btn_link _btn1' 
    : '_social_login_content_btn'; // Assumes this class exists for the Google button

  return (
    <button type="button" className={`${baseClass} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};