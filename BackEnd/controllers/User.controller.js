import cloudinary from "../config/cloudinary.js";
import { mySqlDB } from "../config/db.js";
import bcryptjs from "bcryptjs";
import { handleError } from "../helpers/handleError.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [rows] = await mySqlDB.query(
      "SELECT id, name, email, bio, avatar FROM users WHERE id = ?",
      [userId],
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      user: rows[0],
    });
  } catch (error) {
    return next(handleError(res, 500, error.message));
  }
};

// // updateUser
export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userId } = req.params;
    // Fetch user first
    const [rows] = await mySqlDB.query(
      "SELECT id, name, email, bio, avatar FROM users WHERE id = ?",
      [userId],
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = rows[0];

    // Prepare updated fields
    const updatedFields = {
      name: data.name || user.name,
      email: data.email || user.email,
      bio: data.bio ?? user.bio, // allow empty string
    };

    if (data.password && data.password.length >= 8) {
      updatedFields.password = bcryptjs.hashSync(data.password);
    }

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "swiftweb",
          resource_type: "auto",
        })
        .catch((error) => {
          return next(handleError(500));
        });

      // Safety check
      if (!uploadResult || !uploadResult.secure_url) {
        throw new Error("Cloudinary upload failed, no secure_url returned");
      }
      updatedFields.avatar = uploadResult.secure_url;
    }

    // Build dynamic SET query
    const setQuery = Object.keys(updatedFields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updatedFields);

    // Update database
    await mySqlDB.query(`UPDATE users SET ${setQuery} WHERE id = ?`, [
      ...values,
      userId,
    ]);

    // Fetch updated user
    const [updatedRows] = await mySqlDB.query(
      `SELECT id, name, email, bio, avatar, role, created_at, updated_at 
   FROM users WHERE id = ?`,
      [userId],
    );

    res.status(200).json({
      success: true,
      message: "Data updated",
      user: updatedRows[0],
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const [rows] = await mySqlDB.query(`
      SELECT 
        id,
        name,
        email,
        role,
        avatar,
        created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      users: rows,
      total: rows.length,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [user] = await mySqlDB.query("SELECT id FROM users WHERE id = ?", [
      id,
    ]);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mySqlDB.query("DELETE FROM users WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
