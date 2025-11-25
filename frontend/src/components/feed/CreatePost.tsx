"use client";

import { useState, useContext, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

interface CreatePostProps {
  onPostCreated?: () => void; // Optional prop to refresh feed after posting
}

export const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const { currentUser } = useContext(AuthContext)!;
  
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  // 1. New State for Audience (1 = Public, 0 = Private)
  const [audience, setAudience] = useState(1); 
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file!);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/upload`, 
        formData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let imgUrl = "";
    if (file) imgUrl = await upload();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post`,
        {
          desc,
          img: imgUrl ? imgUrl : null,
          audience, // 2. Send the audience value
        },
        { withCredentials: true }
      );
      
      // 3. Reset State
      setDesc("");
      setFile(null);
      setAudience(1); // Reset to Public
      
      if (onPostCreated) onPostCreated();
      
    } catch (err) {
      console.log("Post creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <Image 
            src={currentUser?.display_pic || "/assets/images/profile.png"} 
            alt="User" 
            width={40} 
            height={40} 
            className="_txt_img rounded-circle object-fit-cover" 
          />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea 
            className="form-control _textarea" 
            placeholder="Leave a comment here" 
            id="createPostText"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <label className="_feed_textarea_label" htmlFor="createPostText">
            Write something {currentUser?.first_name ? `, ${currentUser.first_name}` : ''}...
          </label>
        </div>
      </div>

      {file && (
        <div className="position-relative mt-3 mb-2">
          <div className="d-inline-block position-relative">
            <img 
              className="rounded" 
              alt="Preview" 
              src={URL.createObjectURL(file)} 
              style={{ maxHeight: "150px", objectFit: "cover" }} 
            />
            <button 
              className="btn-close position-absolute top-0 end-0 bg-white m-1 p-1"
              onClick={() => setFile(null)}
              style={{ fontSize: '0.7rem' }}
            ></button>
          </div>
        </div>
      )}
      
      <div className="_feed_inner_text_area_bottom">
        {/* Left Side: Actions */}
        <div className="_feed_inner_text_area_item d-flex align-items-center">
           
           {/* Photo Button */}
           <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <input 
                type="file" 
                id="file" 
                ref={fileInputRef}
                style={{ display: "none" }} 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
                }}
              />
              
              <button type="button" className="_feed_inner_text_area_bottom_photo_link" onClick={handlePhotoClick}>
                 <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img"> 
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path fill="#666" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z"></path>
                   </svg>
                 </span>
                 Photo
              </button>
           </div>

           {/* 4. NEW: Privacy Dropdown */}
           <div className="_feed_inner_text_area_bottom_privacy ms-3">
             <select 
                className="form-select form-select-sm border-0 bg-transparent text-muted fw-bold" 
                style={{ width: 'auto', cursor: 'pointer', fontSize: '14px', boxShadow: 'none' }}
                value={audience}
                onChange={(e) => setAudience(Number(e.target.value))}
             >
               <option value={1}>Public</option>
               <option value={0}>Private</option>
             </select>
           </div>

        </div>
        
        {/* Right Side: Post Button */}
        <div className="_feed_inner_text_area_btn">
           <button 
             type="button" 
             className="_feed_inner_text_area_btn_link"
             onClick={handleClick}
             disabled={loading}
           >
              {loading ? "Posting..." : "Post"}
           </button>
        </div>
      </div>
    </div>
  );
};