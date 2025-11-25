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
        },
        { withCredentials: true }
      );
      
      setDesc("");
      setFile(null);
      
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
        {/* Action Buttons */}
        <div className="_feed_inner_text_area_item">
           <div className="_feed_inner_text_area_bottom_photo _feed_common">
              {/* Hidden Input */}
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
                 Photo
              </button>
           </div>
           {/* Add Video and Article buttons here similar to Photo if needed */}
        </div>
        
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