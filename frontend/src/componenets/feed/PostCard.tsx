"use client";
import Image from "next/image";
import { useState } from "react";

interface PostCardProps {
  author: string;
  time: string;
  content?: string;
  image?: string;
  avatar: string;
}

export const PostCard = ({ author, time, content, image, avatar }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <Image src={avatar} alt={author} width={40} height={40} className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">{author}</h4>
              <p className="_feed_inner_timeline_post_box_para">{time} . <a href="#0">Public</a></p>
            </div>
          </div>
          
          {/* Post Dropdown (3 dots) */}
          <div className="_feed_inner_timeline_post_box_dropdown">
             <button className="_feed_timeline_post_dropdown_link">...</button>
          </div>
        </div>

        {content && <h4 className="_feed_inner_timeline_post_title">{content}</h4>}
        {image && (
          <div className="_feed_inner_timeline_image">
            <Image src={image} alt="Post content" width={600} height={400} className="_time_img" />
          </div>
        )}
      </div>

      {/* Reaction Stats */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
         {/* ... React images ... */}
         <div className="_feed_inner_timeline_total_reacts_txt">
            <p className="_feed_inner_timeline_total_reacts_para1"><span>12</span> Comment</p>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="_feed_inner_timeline_reaction">
         <button className="_feed_inner_timeline_reaction_emoji _feed_reaction">Like</button>
         <button className="_feed_inner_timeline_reaction_comment _feed_reaction" onClick={() => setShowComments(!showComments)}>Comment</button>
         <button className="_feed_inner_timeline_reaction_share _feed_reaction">Share</button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="_feed_inner_timeline_cooment_area">
           <div className="_feed_inner_comment_box">
              {/* Comment Form */}
              <textarea className="form-control _comment_textarea" placeholder="Write a comment"></textarea>
           </div>
        </div>
      )}
    </div>
  );
};