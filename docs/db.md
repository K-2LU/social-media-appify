## Database Design for our social app

### DB Tech: PostgreSQL
---
### Tables
* Users    
  
| column | Description |   
|----|----|
| id | uuid, PK |
| username | varchar |
| email | varchar |
| password | hashed, varchar(256) |
| display_pic | varchar |
| cover_pic | varchar |
| address | varchar |
| friend_list | uuid, fk |

### Posts

| col | desc |
|---|---|
| id | uuid |
| desc | varchar(1048) |
| img_link | varchar(512) |
| user_id | uuid, fk, user table|