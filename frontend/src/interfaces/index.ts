// types.ts

// 1. Users Table
export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  display_pic: string | null;
  cover_pic: string | null;
  address: string | null;
  friend_list: string | null;
  first_name: string | null;
  last_name: string | null;
}

// 2. Posts Table
// export interface Post {
//   id: string;
//   desc: string;
//   img_link: string[] | null; // Postgres array
//   createdAt: string;
//   userId: string;
//   name: string;       // From JOIN users
//   display_pic: string | null; // From JOIN users
//   audience?: number;  // 1 = Public, etc.
// }

export interface Post {
  id: string;
  desc: string;
  img_link: string[] | null;
  userId: string;
  first_name: string;
  last_name: string;
  display_pic: string | null;
  createdAt: string;
  upvote: number | null;
  downvote: number | null;
  audience: number | null;
}

// 3. Comments Table
export interface Comment {
  id: string;
  desc: string;
  created_at: string;
  user_id: string;
  post_id: string;
}

// 4. Followers Table
export interface Follower {
  id: string;
  follower_user_id: string;
  followed_user_id: string | null;
}

// 5. Upvotes Table
export interface Upvote {
  id: string;
  post_id: string;
  user_id: string | null;
}

// Useful for when you join Users into Posts (e.g., displaying the author)
export interface PostWithAuthor extends Post {
  author: Pick<User, "id" | "username" | "display_pic" | "first_name" | "last_name">;
}

// Useful for when you join Users into Comments
export interface CommentWithAuthor extends Comment {
  author: Pick<User, "id" | "username" | "display_pic">;
}

export interface EventData {
  id: string;
  title: string;
  date: string; // ISO String from DB (e.g., "2025-07-10T10:00:00Z")
  image: string;
  attendeesCount: number;
  isUserGoing: boolean; // To toggle the "Going" button status
}