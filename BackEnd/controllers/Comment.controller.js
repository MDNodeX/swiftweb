// comment.controller.js
import { handleError } from "../helpers/handleError.js";
import { mySqlDB } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Create a new comment
export const createComment = async (req, res, next) => {
  try {
    const { blog_id, user_id, content } = req.body;

    if (!blog_id || !content) {
      return res.status(400).json({
        success: false,
        message: "blog_id and content are required",
      });
    }

    const id = uuidv4();

    await mySqlDB.query(
      `INSERT INTO comments (id, blog_id, user_id, content, status) VALUES (?, ?, ?, ?, ?)`,
      [id, blog_id, user_id || null, content, "approved"],
    );

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment_id: id,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// Get all comments for a blog
export const getCommentsByBlog = async (req, res, next) => {
  try {
    const { blog_id } = req.params;

    if (!blog_id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const [comments] = await mySqlDB.query(
      `
      SELECT 
        c.id,
        c.content,
        c.status,
        c.created_at,
        c.blog_id,
        u.id AS user_id,
        u.name AS user_name,
        u.avatar AS user_avatar,
        b.title AS blog_title,
        b.author_id AS blog_author_id
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN blogs b ON c.blog_id = b.id
      WHERE c.blog_id = ?
      ORDER BY c.created_at DESC
      `,
      [blog_id],
    );

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// Get comment count for a blog
export const getCommentCount = async (req, res, next) => {
  try {
    const { blog_id } = req.params;

    if (!blog_id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const [rows] = await mySqlDB.query(
      "SELECT COUNT(*) AS count FROM comments WHERE blog_id = ?",
      [blog_id],
    );

    res.status(200).json({
      success: true,
      count: rows?.[0]?.count || 0,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};
// Delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [comment] = await mySqlDB.query(
      "SELECT id FROM comments WHERE id = ?",
      [id],
    );

    if (comment.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    await mySqlDB.query("DELETE FROM comments WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};
// // Get all comments
export const getAllComment = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get user role
    const [userRows] = await mySqlDB.query(
      "SELECT role FROM users WHERE id = ?",
      [userId],
    );

    const userRole = userRows[0].role;

    let comments;

    if (userRole === "admin") {
      // Admin sees all comments
      [comments] = await mySqlDB.query(`
        SELECT 
          c.id,
          c.content,
          c.status,
          c.created_at,
          b.id AS blog_id,
          b.title AS blog_title,
          u.id AS user_id,
          u.name AS user_name,
          u.avatar AS user_avatar
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN blogs b ON c.blog_id = b.id
        ORDER BY c.created_at DESC
      `);
    } else {
      // Normal user sees only their own comments
      [comments] = await mySqlDB.query(
        `
        SELECT 
          c.id,
          c.content,
          c.status,
          c.created_at,
          b.id AS blog_id,
          b.title AS blog_title,
          u.id AS user_id,
          u.name AS user_name,
          u.avatar AS user_avatar
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN blogs b ON c.blog_id = b.id
        WHERE c.user_id = ?
        ORDER BY c.created_at DESC
      `,
        [userId],
      );
    }

    res.status(200).json({
      success: true,
      total: comments.length,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const showAllComment = async (req, res, next) => {
  try {
    const [rows] = await mySqlDB.query(`
      SELECT 
        c.id,
        c.content,
        c.status,
        c.created_at,
        b.title AS blog_title,
        u.name AS user_name,
        u.avatar AS user_avatar
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN blogs b ON c.blog_id = b.id
      ORDER BY c.created_at DESC
    `);

    res.status(200).json({
      success: true,
      total: rows.length,
      comments: rows,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};
