import pool from "../connect.js";
import jwt from "jsonwebtoken";

export const getFollowers = (req, res) => {
    // Query to get all users who follow the specific 'followedUserId'
    const q = "SELECT follower_user_id FROM followers WHERE followed_user_id = $1";

    pool.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(data.rows.map(relationship => relationship.follower_user_id));
    });
};

export const addFollower = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO followers (follower_user_id, followed_user_id) VALUES ($1, $2)";
        const values = [
            userInfo.id,        // Follower
            req.body.userId     // Followed
        ];

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following");
        });
    });
};

export const deleteFollower = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM followers WHERE follower_user_id = $1 AND followed_user_id = $2";
        const values = [
            userInfo.id,        // The current logged-in user
            req.query.userId    // The user they want to unfollow
        ];

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollowed");
        });
    });
};