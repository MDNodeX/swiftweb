import { handleError } from "../helpers/handleError.js";
import { mySqlDB } from "../config/db.js"; // adjust path if different

// ✅ Create Category
export const createCategory = async (req, res, next) => {
  console.log("BODY:", req.body);
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }

    const [existing] = await mySqlDB.query(
      "SELECT id FROM categories WHERE slug = ?",
      [slug],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    await mySqlDB.query(
      "INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)",
      [name, slug, description || null],
    );

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// ✅ Get Single Category
export const getSingleCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;

    const [rows] = await mySqlDB.query(
      "SELECT * FROM categories WHERE id = ?",
      [category_id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category: rows[0],
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// ✅ edit Category
export const updateCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const { name, slug, description } = req.body;

    await mySqlDB.query(
      "UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?",
      [name, slug, description || null, category_id],
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// ✅ delete Category
export const deleteCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    console.log("Deleting category ID:", category_id);

    const [result] = await mySqlDB.query(
      "DELETE FROM categories WHERE id = ?",
      [category_id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// ✅ Get All Categories
export const getAllCategories = async (req, res, next) => {
  try {
    const [categories] = await mySqlDB.query(
      "SELECT * FROM categories ORDER BY created_at DESC",
    );

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
