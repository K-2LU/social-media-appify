"use client";

import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "@/context/authContext";
import { CommentType } from "@/interfaces";


interface CommentItemProps {
  comment: CommentType;
  replies?: CommentType[];
  onReply?: () => void;
}

export const CommentItem = ({ comment, replies = [], onReply }: CommentItemProps) => {
  const { currentUser } = useContext(AuthContext)!;
  const [showReply, setShowReply] = useState(false);

  const [likes, setLikes] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const [replyDesc, setReplyDesc] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);


  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment-vote?commentId=${comment.id}`);
        setLikes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLikes();
  }, [comment.id]);

  useEffect(() => {
    if (currentUser) {
      setIsLiked(likes.includes(currentUser.id));
    }
  }, [likes, currentUser]);


  const handleLike = async () => {
    if (isLiked) {
      setLikes((prev) => prev.filter((id) => id !== currentUser?.id));
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment-vote?commentId=${comment.id}`, { withCredentials: true });
      } catch (err) {
        if (currentUser?.id) setLikes((prev) => [...prev, currentUser.id]);
      }
    } else {
      if (currentUser?.id) setLikes((prev) => [...prev, currentUser.id]);
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment-vote`, { commentId: comment.id }, { withCredentials: true });
      } catch (err) {
        setLikes((prev) => prev.filter((id) => id !== currentUser?.id));
      }
    }
  };


  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyDesc.trim()) return;

    setReplyLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment`,
        {
          desc: replyDesc,
          postId: comment.post_id,
          parentCommentId: comment.id
        },
        { withCredentials: true }
      );

      setReplyDesc("");
      setShowReply(false);

      if (onReply) onReply();

    } catch (err) {
      console.error("Failed to reply", err);
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div className="_comment_wrapper">
      {/* --- Level 1 Comment --- */}
      <div className="_comment_main">
        <div className="_comment_image">
          <Link href={`/profile/${comment.userId}`} className="_comment_image_link">
            <Image
              src={comment.profilePic || "/assets/images/profile.png"}
              alt={comment.first_name || ""}
              width={40}
              height={40}
              className="_comment_img1 rounded-circle object-fit-cover"
            />
          </Link>
        </div>

        <div className="_comment_area">
          <div className="_comment_details w-full">
            <div className="_comment_details_top">
              <div className="_comment_name">
                <Link href={`/profile/${comment.userId}`}>
                  <h4 className="_comment_name_title">{comment.first_name + ' ' + comment.last_name}</h4>
                </Link>
              </div>
            </div>

            <div className="_comment_status">
              <p className="_comment_status_text">
                <span>{comment.desc}</span>
              </p>
            </div>

            {/* Like Count Bubble */}
            {likes.length > 0 && (
              <div className="_total_reactions" style={{ right: '-15px' }}>
                <div className="_total_react">
                  <span className="_reaction_like">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up" style={{ fill: '#377dff', stroke: 'none' }}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  </span>
                </div>
                <span className="_total">{likes.length}</span>
              </div>
            )}

            <div className="_comment_reply">
              <div className="_comment_reply_num">
                <ul className="_comment_reply_list">
                  <li>
                    <button
                      className={`btn p-0 border-0 ${isLiked ? 'text-primary fw-bold' : 'text-muted'}`}
                      style={{ fontSize: '12px' }}
                      onClick={handleLike}
                    >
                      Like
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn p-0 border-0 text-muted"
                      style={{ fontSize: '12px' }}
                      onClick={() => setShowReply(!showReply)}
                    >
                      Reply
                    </button>
                  </li>
                  <li><span style={{ fontSize: '12px' }}>Share</span></li>
                  <li><span className="_time_link" style={{ fontSize: '12px' }}>. {moment(comment.created_at).fromNow()}</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nested Reply Input Box */}
          {showReply && (
            <div className="_feed_inner_comment_box mt-2">
              <form className="_feed_inner_comment_box_form" onSubmit={handleReplySubmit}>
                <div className="_feed_inner_comment_box_content">
                  <div className="_feed_inner_comment_box_content_image">
                    <Image
                      src={currentUser?.display_pic || "/assets/images/profile.png"}
                      width={30}
                      height={30}
                      alt="User"
                      className="_comment_img rounded-circle"
                    />
                  </div>
                  <div className="_feed_inner_comment_box_content_txt">
                    <textarea
                      className="form-control _comment_textarea"
                      placeholder={`Reply to ${comment.first_name}...`}
                      value={replyDesc}
                      onChange={(e) => setReplyDesc(e.target.value)}
                      disabled={replyLoading}
                    ></textarea>
                  </div>
                </div>
                <div className="_feed_inner_comment_box_icon text-end">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm py-0 px-2"
                    style={{ fontSize: '12px' }}
                    disabled={replyLoading}
                  >
                    {replyLoading ? "..." : "Reply"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* --- Level 2: Nested Replies Section --- */}
      {replies.length > 0 && (
        <div className="_comment_replies ms-5 ps-3 position-relative">
          {/* Visual thread line */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: '15px',
            width: '2px',
            backgroundColor: '#f0f2f5'
          }} />

          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply} // Pass refresh trigger down recursively
            />
          ))}
        </div>
      )}
    </div>
  );
};