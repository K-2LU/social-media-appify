import Image from 'next/image';
import Link from 'next/link';

// Global styles
import '@/styles/main.css'; 
import '@/styles/responsive.css';
import { BgShapes } from '@/componenets/login/BgShapes';
import { Button } from '@/componenets/ui/Button';
import { RegisterForm } from '@/componenets/register/RegisterForm';

export default function RegisterPage() {
  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <BgShapes />
      
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left Side: Images */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <Image 
                    src="/assets/images/registration.png" 
                    alt="Registration Illustration" 
                    width={600} 
                    height={600}
                    priority 
                  />
                </div>
                <div className="_social_registration_right_image_dark">
                  <Image 
                    src="/assets/images/registration1.png" 
                    alt="Registration Dark Mode" 
                    width={600} 
                    height={600} 
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <Image 
                    src="/assets/images/logo.svg" 
                    alt="Logo" 
                    width={150} 
                    height={50} 
                    className="_right_logo" 
                  />
                </div>
                
                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                
                <Button variant="social" className="_social_registration_content_btn _mar_b40">
                  <Image src="/assets/images/google.svg" alt="Google" width={20} height={20} className="_google_img" /> 
                  <span>Register with google</span>
                </Button>
                
                <div className="_social_registration_content_bottom_txt _mar_b40"> 
                  <span>Or</span>
                </div>

                <RegisterForm />

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">
                        Dont have an account? <Link href="/login">Create New Account</Link>
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