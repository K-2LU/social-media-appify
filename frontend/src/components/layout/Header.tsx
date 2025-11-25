"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        <div className="_logo_wrap">
          <Link className="navbar-brand" href="/feed">
            <Image src="/assets/images/logo.svg" alt="Logo" width={100} height={40} className="_nav_logo" />
          </Link>
        </div>
        
        {/* ... Navbar Toggler ... */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="_header_form ms-auto">
            <form className="_header_form_grp">
                {/* ... Search SVG ... */}
               <input className="form-control me-2 _inpt1" type="search" placeholder="input search text" aria-label="Search" />
            </form>
          </div>

          <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
            {/* Home Link */}
            <li className="nav-item _header_nav_item">
              <Link href="/feed" className="nav-link _header_nav_link_active _header_nav_link">
                 {/* ... Home SVG ... */}
              </Link>
            </li>

            {/* Notification Dropdown Logic */}
            <li className="nav-item _header_nav_item">
              <span 
                className="nav-link _header_nav_link _header_notify_btn" 
                onClick={() => setShowNotif(!showNotif)}
                style={{ cursor: 'pointer' }}
              >
                {/* ... Bell SVG ... */}
                <span className="_counting">6</span>
                
                {/* Dropdown Content */}
                <div id="_notify_drop" className={`_notification_dropdown ${showNotif ? 'show' : ''}`}>
                  <div className="_notifications_content">
                    <h4 className="_notifications_content_title">Notifications</h4>
                    {/* ... Notification List Items ... */}
                  </div>
                </div>
              </span>
            </li>
          </ul>

          <div className="_header_nav_profile">
            <div className="_header_nav_profile_image">
              <Image src="/assets/images/profile.png" alt="Profile" width={40} height={40} className="_nav_profile_img" />
            </div>
            {/* Profile Dropdown Trigger */}
            <div className="_header_nav_dropdown">
               <p className="_header_nav_para">Dylan Field</p>
               <button onClick={() => setShowProfile(!showProfile)} className="_header_nav_dropdown_btn _dropdown_toggle" type="button">
                 {/* Arrow SVG */}
               </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};