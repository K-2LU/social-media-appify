"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { CommentType, Post } from "@/interfaces";
import { Comments } from "./Comments";
import { CommentInput } from "./CommentInput";
import axios from "axios";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);


  const resolveImage = (imgName: string) => `/upload/${imgName}`;
  const profilePic = post.display_pic || "/assets/images/Avatar.png";

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment?postId=${post.id}`,
        { withCredentials: true }
      );
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch comments when the section is toggled open
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, post.id]);


  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">

        {/* --- TOP SECTION (Author info & Menu) --- */}
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            {/* Author Avatar */}
            <div className="_feed_inner_timeline_post_box_image">
              <Link href={`/profile/${post.userId}`}>
                <Image
                  src={profilePic}
                  alt={post.first_name + ' ' + post.last_name}
                  width={44}
                  height={44}
                  className="_post_img rounded-circle object-fit-cover"
                />
              </Link>
            </div>

            {/* Author Name & Time */}
            <div className="_feed_inner_timeline_post_box_txt">
              <Link href={`/profile/${post.userId}`}>
                <h4 className="_feed_inner_timeline_post_box_title">{post.first_name + ' ' + post.last_name}</h4>
              </Link>
              <p className="_feed_inner_timeline_post_box_para">
                {moment(post.createdAt).fromNow()} .
                <a href="#0"> {post.audience === 1 ? "Public" : "Friends"}</a>
              </p>
            </div>
          </div>

          {/* Dropdown Menu (Three Dots) */}
          <div className="_feed_inner_timeline_post_box_dropdown" style={{ position: 'relative' }}>
            <div className="_feed_timeline_post_dropdown">
              <button
                type="button"
                className="_feed_timeline_post_dropdown_link"
                onClick={() => setShowMenu(!showMenu)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>

            {/* Dropdown Content */}
            {showMenu && (
              <div className="_feed_timeline_dropdown show" style={{ display: 'block', right: 0, top: '30px' }}>
                <ul className="_feed_timeline_dropdown_list">
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        {/* Save Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z" />
                        </svg>
                      </span>
                      Save Post
                    </a>
                  </li>
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        {/* Delete Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5" />
                        </svg>
                      </span>
                      Delete Post
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <h4 className="_feed_inner_timeline_post_title">{post.desc}</h4>

        {/* Image Rendering Logic */}
        {post.img_link && post.img_link.length > 0 && (
          <div className="_feed_inner_timeline_image">
            {/* Currently displaying only the first image. You can map this if you have a grid layout */}
            <Image
              src={resolveImage(post.img_link[0])}
              alt="Post Content"
              width={600}
              height={400}
              className="_time_img w-100 h-auto object-fit-cover"
            />
          </div>
        )}
      </div>

      {/* --- STATS SECTION --- */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          {/* Static react images for now - integrate real likes later */}
          <Image src="/assets/images/react_img1.png" alt="" width={20} height={20} className="_react_img1" />
          <p className="_feed_inner_timeline_total_reacts_para">{post.upvote || 0}</p>
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <span>0</span> Comments
          </p>
        </div>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="_feed_inner_timeline_reaction">
        <button className="_feed_inner_timeline_reaction_emoji _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link"> <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
              <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"></path>
              <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"></path>
              <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"></path>
              <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"></path>
            </svg>
            Haha
          </span>
          </span>
        </button>

        <button
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="_feed_inner_timeline_reaction_link"> <span>
            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
              <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"></path>
              <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"></path>
            </svg>
            Comment
          </span>
          </span>
        </button>

        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link"> <span>
            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
              <path stroke="#000" stroke-linejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"></path>
            </svg>

            Share
          </span>
          </span>
        </button>
      </div>

      {/* --- COMMENTS SECTION --- */}
      {showComments && (
        <div className="_feed_inner_timeline_cooment_area">


          <CommentInput postId={post.id} onCommentAdded={fetchComments} />

          <Comments comments={comments} />

        </div>
      )}
    </div>
  );
};