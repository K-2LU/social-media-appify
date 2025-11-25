import pool from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
    const q = "SELECT user_id FROM upvotes WHERE post_id = $1";

    pool.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        // Return an array of user IDs (e.g., ["123", "456"])
        return res.status(200).json(data.rows.map(vote => vote.user_id));
    });
};

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO upvotes (user_id, post_id) VALUES ($1, $2)";
        const values = [
            userInfo.id,
            req.body.postId
        ];

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked.");
        });
    });
};

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM upvotes WHERE user_id = $1 AND post_id = $2";
        const values = [
            userInfo.id,
            req.query.postId
        ];

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked.");
        });
    });
};