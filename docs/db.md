# Database Schema

This document outlines the database schema for the Social Media Appify application, which is based on a PostgreSQL database.

## Tables

### `users`

This table stores information about the users of the application.

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `DEFAULT uuid_generate_v4()`, `NOT NULL`, `PRIMARY KEY` | Unique identifier for the user. |
| `username` | `character varying(32)` | `NOT NULL` | User's unique username. |
| `email` | `character varying(128)` | `NOT NULL` | User's email address. |
| `password` | `character varying(256)` | `NOT NULL` | Hashed password for the user. |
| `display_pic` | `character varying(512)` | | URL to the user's profile picture. |
| `cover_pic` | `character varying(512)` | | URL to the user's cover picture. |
| `address` | `character varying(512)` | | User's address. |
| `friend_list` | `uuid` | | (Legacy or unused) |
| `first_name` | `character varying(32)` | | User's first name. |
| `last_name` | `character varying(50)` | | User's last name. |

### `posts`

This table contains all the posts created by users.

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `DEFAULT uuid_generate_v4()`, `NOT NULL`, `PRIMARY KEY` | Unique identifier for the post. |
| `desc` | `character varying(1048)` | `NOT NULL` | The text content of the post. |
| `img_link` | `character varying(1048)[]` | | Array of image URLs associated with the post. |
| `user_id` | `uuid` | `NOT NULL` | The ID of the user who created the post. |
| `createdAt` | `timestamp with time zone` | `NOT NULL` | Timestamp when the post was created. |
| `upvote` | `integer` | | (Legacy or unused) Count of upvotes. |
| `downvote` | `integer` | | (Legacy or unused) Count of downvotes. |
| `audience` | `integer` | | Audience setting for the post (e.g., 1 for public, 0 for private). |

**Foreign Keys:**
*   `user_id` references `users(id)`.

### `comments`

This table stores comments made on posts. It also supports nested comments (replies).

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `DEFAULT uuid_generate_v4()`, `NOT NULL`, `PRIMARY KEY` | Unique identifier for the comment. |
| `desc` | `character varying(1048)` | `NOT NULL` | The text content of the comment. |
| `created_at` | `timestamp with time zone` | `NOT NULL` | Timestamp when the comment was created. |
| `user_id` | `uuid` | `NOT NULL` | The ID of the user who created the comment. |
| `post_id` | `uuid` | `NOT NULL` | The ID of the post this comment belongs to. |
| `parent_comment_id` | `uuid` | | The ID of the parent comment if this is a reply. |

**Foreign Keys:**
*   `user_id` references `users(id)`.
*   `post_id` references `posts(id)`.
*   `parent_comment_id` references `comments(id)`.

### `followers`

This table represents the "follow" relationship between users.

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `DEFAULT uuid_generate_v4()`, `NOT NULL`, `PRIMARY KEY` | Unique identifier for the follow relationship. |
| `follower_user_id` | `uuid` | `NOT NULL` | The ID of the user who is following. |
| `followed_user_id` | `uuid` | | The ID of the user who is being followed. |

**Foreign Keys:**
*   `follower_user_id` references `users(id)`.
*   `followed_user_id` references `users(id)`.

### `upvotes`

This table tracks the "upvotes" (or likes) on posts.

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `DEFAULT uuid_generate_v4()`, `NOT NULL`, `PRIMARY KEY` | Unique identifier for the upvote. |
| `post_id` | `uuid` | `NOT NULL` | The ID of the post that was upvoted. |
| `user_id` | `uuid` | | The ID of the user who upvoted. |

**Foreign Keys:**
*   `post_id` references `posts(id)`.
*   `user_id` references `users(id)`.

### `comment_likes`

This table tracks the "likes" on comments.

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | `DEFAULT uuid_generate_v4()`, `NOT NULL`, `PRIMARY KEY` | Unique identifier for the comment like. |
| `user_id` | `uuid` | `NOT NULL` | The ID of the user who liked the comment. |
| `comment_id` | `uuid` | `NOT NULL` | The ID of the comment that was liked. |

**Constraints:**
*   A `UNIQUE` constraint on (`user_id`, `comment_id`) ensures that a user can only like a comment once.

**Foreign Keys:**
*   `user_id` references `users(id)`.
*   `comment_id` references `comments(id)`.
