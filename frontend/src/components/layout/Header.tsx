"use client";

import { useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';

export const Header = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // 1. Access AuthContext
  const { currentUser, logout } = useContext(AuthContext)!;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Helper to get display name (First Last, or Username)
  const displayName = currentUser?.first_name 
    ? `${currentUser.first_name} ${currentUser.last_name}` 
    : currentUser?.username;

  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        <div className="_logo_wrap">
          <Link className="navbar-brand" href="/feed">
            <Image src="/assets/images/logo.svg" alt="Logo" width={100} height={40} className="_nav_logo" />
          </Link>
        </div>
        
        {/* ... Navbar Toggler (Keep existing code) ... */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="_header_form ms-auto">
            <form className="_header_form_grp">
               {/* SVG Icon ... */}
               <input className="form-control me-2 _inpt1" type="search" placeholder="input search text" aria-label="Search" />
            </form>
          </div>

          <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
            <li className="nav-item _header_nav_item">
              <Link href="/feed" className="nav-link _header_nav_link_active _header_nav_link">
                 {/* Home SVG ... */}
              </Link>
            </li>

            {/* Notification Logic */}
            <li className="nav-item _header_nav_item">
              <span 
                className="nav-link _header_nav_link _header_notify_btn" 
                onClick={() => setShowNotif(!showNotif)}
                style={{ cursor: 'pointer' }}
              >
                {/* Bell SVG ... */}
                <span className="_counting">6</span>
                
                <div id="_notify_drop" className={`_notification_dropdown ${showNotif ? 'show' : ''}`}>
                  <div className="_notifications_content">
                    <h4 className="_notifications_content_title">Notifications</h4>
                    {/* Notification items */}
                  </div>
                </div>
              </span>
            </li>
          </ul>

          {/* 2. CONDITIONAL RENDERING START */}
          <div className="_header_nav_profile">
            {currentUser ? (
              // STATE: LOGGED IN
              <>
                <div className="_header_nav_profile_image">
                  <Image 
                    src={currentUser.display_pic || "/assets/images/profile.png"} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="_nav_profile_img rounded-circle" 
                    style={{ objectFit: "cover" }}
                  />
                </div>
                
                <div className="_header_nav_dropdown" style={{ position: 'relative' }}>
                   <p className="_header_nav_para">{displayName}</p>
                   
                   <button 
                     onClick={() => setShowProfile(!showProfile)} 
                     className="_header_nav_dropdown_btn _dropdown_toggle" 
                     type="button"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
                        <path fill="#112032" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
                     </svg>
                   </button>

                   {/* PROFILE DROPDOWN MENU */}
                   {showProfile && (
                     <div className="_nav_profile_dropdown show" style={{ position: 'absolute', top: '100%', right: 0 }}>
                       <div className="_nav_profile_dropdown_info">
                          {/* Dropdown Header Info */}
                          <div className="_nav_profile_dropdown_info_txt">
                             <h4 className="_nav_dropdown_title">{displayName}</h4>
                             <Link href="/profile" className="_nav_drop_profile">View Profile</Link>
                          </div>
                       </div>
                       <hr />
                       <ul className="_nav_dropdown_list">
                          <li className="_nav_dropdown_list_item">
                             {/* Logout Button */}
                             <button 
                                onClick={handleLogout}
                                className="_nav_dropdown_link w-100 text-start border-0 bg-transparent"
                             >
                                <div className="_nav_drop_info">
                                   <span>
                                     {/* Logout SVG */}
                                     <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                        <path stroke="#377DFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"/>
                                     </svg>
                                   </span>
                                   Log Out
                                </div>
                             </button>
                          </li>
                       </ul>
                     </div>
                   )}
                </div>
              </>
            ) : (
              // STATE: LOGGED OUT
              <div className="d-flex gap-2">
                <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
                <Link href="/register" className="btn btn-outline-primary btn-sm">Register</Link>
              </div>
            )}
          </div>
          {/* CONDITIONAL RENDERING END */}

        </div>
      </div>
    </nav>
  );
};