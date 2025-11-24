import Image from 'next/image';
import Link from 'next/link';

import '@/styles/main.css'; 
import '@/styles/responsive.css';

import { BgShapes } from '@/components/login/BgShapes';
import { Button } from '@/components/ui/Button';
import { LoginForm } from '@/components/login/LoginForm';

export default function LoginPage() {
  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <BgShapes />
      
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left Side Image */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <Image 
                    src="/assets/images/login.png" 
                    alt="Login Illustration" 
                    width={600} 
                    height={600} 
                    className="_left_img"
                    priority 
                  />
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <Image src="/assets/images/logo.svg" alt="Logo" width={150} height={50} className="_left_logo" />
                </div>
                
                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
                
                {/* Google Button */}
                <Button variant="social" className="_mar_b40">
                  <Image src="/assets/images/google.svg" alt="Google" width={20} height={20} className="_google_img" /> 
                  <span>Or sign-in with google</span>
                </Button>
                
                <div className="_social_login_content_bottom_txt _mar_b40"> 
                  <span>Or</span>
                </div>

                <LoginForm />

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">
                        Dont have an account? <Link href="/register">Create New Account</Link>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}