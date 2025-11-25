"use client";

import { CommentType } from "@/interfaces";
import { CommentItem } from "./CommentItem";

interface CommentsProps {
  comments: CommentType[];
}

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className="_timline_comment_main">
      {comments.length > 3 && (
        <div className="_previous_comment">
          <button type="button" className="_previous_comment_txt">
            View previous comments
          </button>
        </div>
      )}

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      
      {comments.length === 0 && (
        <p className="text-center text-muted py-2" style={{fontSize: '14px'}}>No comments yet. Be the first!</p>
      )}
    </div>
  );
};