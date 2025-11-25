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
          <span className="_feed_inner_timeline_reaction_link">
            <span className="me-2">👍</span> Like
          </span>
        </button>

        <button
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span className="me-2">💬</span> Comment
          </span>
        </button>

        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span className="me-2">↗️</span> Share
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