"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface CommentType {
  id: string;
  desc: string;
  name: string;
  userId: string;
  profilePic: string | null;
  createdAt?: string;
}

interface CommentItemProps {
  comment: CommentType;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <Link href={`/profile/${comment.userId}`} className="_comment_image_link">
          <Image 
            src={comment.profilePic || "/assets/images/profile.png"} 
            alt={comment.name} 
            width={40} 
            height={40} 
            className="_comment_img1 rounded-circle object-fit-cover" 
          />
        </Link>
      </div>
      
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <Link href={`/profile/${comment.userId}`}>
                <h4 className="_comment_name_title">{comment.name}</h4>
              </Link>
            </div>
          </div>
          
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.desc}</span>
            </p>
          </div>
          
          <div className="_total_reactions">
            <div className="_total_react">
              <span className="_reaction_like">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              </span>
              <span className="_reaction_heart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </span>
            </div>
            <span className="_total">0</span>
          </div>
          
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li><button className="btn p-0 border-0 text-muted" style={{fontSize: '12px'}}>Like</button></li>
                <li><button className="btn p-0 border-0 text-muted" style={{fontSize: '12px'}} onClick={() => setShowReply(!showReply)}>Reply</button></li>
                <li><span style={{fontSize: '12px'}}>Share</span></li>
                <li><span className="_time_link" style={{fontSize: '12px'}}>. 1m</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nested Reply Box (Toggled) */}
        {showReply && (
          <div className="_feed_inner_comment_box mt-2">
            <form className="_feed_inner_comment_box_form" onSubmit={(e) => e.preventDefault()}>
              <div className="_feed_inner_comment_box_content">
                <div className="_feed_inner_comment_box_content_image">
                  {/* Current User Avatar would go here */}
                  <Image src="/assets/images/profile.png" width={30} height={30} alt="" className="_comment_img rounded-circle" />
                </div>
                <div className="_feed_inner_comment_box_content_txt">
                  <textarea className="form-control _comment_textarea" placeholder="Write a reply..."></textarea>
                </div>
              </div>
              <div className="_feed_inner_comment_box_icon text-end">
                 <button className="btn btn-primary btn-sm py-0 px-2" style={{fontSize: '12px'}}>Reply</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};