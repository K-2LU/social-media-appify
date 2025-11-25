"use client";

import { CommentType } from "@/interfaces";
import { CommentItem } from "./CommentItem";

interface CommentsProps {
  comments: CommentType[];
  onReply?: () => void; // Add this to pass the refresh trigger down
}

export const Comments = ({ comments, onReply }: CommentsProps) => {
  
  // 1. Filter out the top-level comments (Level 1)
  const rootComments = comments.filter(
    (comment) => comment.parent_comment_id === null
  );

  // 2. Helper to find children for a specific parent (Level 2)
  const getReplies = (parentId: string) => {
    return comments.filter((comment) => comment.parent_comment_id === parentId);
  };

  return (
    <div className="_timline_comment_main">
      {/* View Previous Comments Button logic can go here */}
      
      {/* Render only Root Comments */}
      {rootComments.map((rootComment) => (
        <CommentItem 
          key={rootComment.id} 
          comment={rootComment} 
          // 3. Pass the children dynamically
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