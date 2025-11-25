"use client";

import { CommentType } from "@/interfaces";
import { CommentItem } from "./CommentItem";

interface CommentsProps {
  comments: CommentType[];
  onReply?: () => void;
}

export const Comments = ({ comments, onReply }: CommentsProps) => {
  
  // top-level comments
  const rootComments = comments.filter(
    (comment) => comment.parent_comment_id === null
  );

  //  children comment for a specific parent
  const getReplies = (parentId: string) => {
    return comments.filter((comment) => comment.parent_comment_id === parentId);
  };

  return (
    <div className="_timline_comment_main">
      {rootComments.map((rootComment) => (
        <CommentItem 
          key={rootComment.id} 
          comment={rootComment} 
          replies={getReplies(rootComment.id)}
          onReply={onReply}
        />
      ))}
      
      {comments.length === 0 && (
        <p className="text-center text-muted py-2" style={{fontSize: '14px'}}>
          No comments yet.
        </p>
      )}
    </div>
  );
};