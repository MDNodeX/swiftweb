import { handleError } from "../helpers/handleError.js";
import { mySqlDB } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const createBlog = async (req, res, next) => {
  try {
    const {
      author_id,
      category_id,
      title,
      slug,
      content,
      status,
      meta_title,
      meta_description,
    } = req.body;

    //Check required fields
    if (!author_id || !category_id || !title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Check slug uniqueness
    const [existing] = await mySqlDB.query(
      "SELECT id FROM blogs WHERE slug = ?",
      [slug],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    // Use raw HTML from CKEditor, store as-is
    const safeContent = content;

    let featuredImage = null;

    // Upload image if exists
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "swiftweb/featuredImage",
        resource_type: "auto",
      });

      featuredImage = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const id = uuidv4();

    await mySqlDB.query(
      `INSERT INTO blogs 
       (id, author_id, category_id, title, slug, featured_image, content, status, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        author_id,
        category_id,
        title,
        slug,
        featuredImage,
        safeContent,
        status || "draft",
        meta_title || null,
        meta_description || null,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // get user role
    const [userRows] = await mySqlDB.query(
      "SELECT role FROM users WHERE id = ?",
      [userId],
    );

    const userRole = userRows[0].role;

    let blogsQuery = `
      SELECT 
        b.id,
        b.title,
        b.slug,
        b.featured_image,
        b.content,
        b.status,
        b.meta_title,
        b.meta_description,
        b.created_at,
        u.id AS author_id,
        u.name AS author_name,
        c.id AS category_id,
        c.name AS category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
    `;

    let values = [];

    if (userRole !== "admin") {
      blogsQuery += " WHERE b.author_id = ?";
      values.push(userId);
    }

    blogsQuery += " ORDER BY b.created_at DESC";

    const [blogs] = await mySqlDB.query(blogsQuery, values);

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      author_id,
      category_id,
      title,
      slug,
      content,
      status,
      meta_title,
      meta_description,
    } = req.body;

    // if (!id) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Blog ID is required",
    //   });
    // }

    // // Check if blog exists
    // const [existingBlog] = await mySqlDB.query(
    //   "SELECT * FROM blogs WHERE id = ?",
    //   [id],
    // );
    // if (existingBlog.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Blog not found",
    //   });
    // }

    // Check slug uniqueness (exclude current blog)
    if (slug) {
      const [slugCheck] = await mySqlDB.query(
        "SELECT id FROM blogs WHERE slug = ? AND id != ?",
        [slug, id],
      );
      if (slugCheck.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    // Use raw HTML content as-is
    const safeContent = content || existingBlog[0].content;

    let featuredImage = existingBlog[0].featured_image;

    // Upload new image if provided
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "swiftweb/featuredImage",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    // Update blog in DB
    await mySqlDB.query(
      `UPDATE blogs SET 
        author_id = ?, 
        category_id = ?, 
        title = ?, 
        slug = ?, 
        featured_image = ?, 
        content = ?, 
        status = ?, 
        meta_title = ?, 
        meta_description = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        author_id || existingBlog[0].author_id,
        category_id || existingBlog[0].category_id,
        title || existingBlog[0].title,
        slug || existingBlog[0].slug,
        featuredImage,
        safeContent,
        status || existingBlog[0].status,
        meta_title || existingBlog[0].meta_title,
        meta_description || existingBlog[0].meta_description,
        id,
      ],
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      author_id,
      category_id,
      title,
      slug,
      content,
      status,
      meta_title,
      meta_description,
    } = req.body;

    // Fetch existing blog
    const [existingRows] = await mySqlDB.query(
      "SELECT * FROM blogs WHERE id = ?",
      [id],
    );

    if (existingRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const existingBlog = existingRows[0];

    // Slug uniqueness check
    if (slug) {
      const [slugCheck] = await mySqlDB.query(
        "SELECT id FROM blogs WHERE slug = ? AND id != ?",
        [slug, id],
      );
      if (slugCheck.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Slug already exists" });
      }
    }

    // Featured image handling
    let featuredImage = existingBlog.featured_image;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "swiftweb/featuredImage",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    // Update all fields (allow empty strings)
    await mySqlDB.query(
      `UPDATE blogs SET
        author_id = ?,
        category_id = ?,
        title = ?,
        slug = ?,
        featured_image = ?,
        content = ?,
        status = ?,
        meta_title = ?,
        meta_description = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        author_id !== undefined ? author_id : existingBlog.author_id,
        category_id !== undefined ? category_id : existingBlog.category_id,
        title !== undefined ? title : existingBlog.title,
        slug !== undefined ? slug : existingBlog.slug,
        featuredImage,
        content !== undefined ? content : existingBlog.content,
        status !== undefined ? status : existingBlog.status,
        meta_title !== undefined ? meta_title : existingBlog.meta_title,
        meta_description !== undefined
          ? meta_description
          : existingBlog.meta_description,
        id,
      ],
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      featured_image: featuredImage,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // if (!blog_id) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Blog ID is required",
    //   });
    // }

    // Check if the blog exists
    // const [existing] = await mySqlDB.query(
    //   "SELECT * FROM blogs WHERE id = ?",
    //   [id]
    // );

    // if (existing.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Blog not found",
    //   });
    // }

    // Delete the blog
    await mySqlDB.query("DELETE FROM blogs WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

//publicroute
export const ShowAllBlogs = async (req, res, next) => {
  try {
    // Get pagination params from query, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Fetch blogs with author and category names
    const [blogs] = await mySqlDB.query(
      `
      SELECT
        b.*,
        c.name AS category_name,
        c.slug AS category_slug,
        u.name AS author_name,
        u.avatar AS author_avatar,
        u.role AS author_role
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN users u ON b.author_id = u.id
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `,
      [limit, offset],
    );

    // Get total count for pagination
    const [[{ total }]] = await mySqlDB.query(
      `SELECT COUNT(*) AS total FROM blogs`,
    );

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

export const BlogSinglePage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await mySqlDB.query(
      `
      SELECT 
        b.*,
        c.name AS category_name,
        c.slug AS category_slug,
        u.name AS author_name,
        u.avatar AS author_avatar,
        u.role AS author_role
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN users u ON b.author_id = u.id
      WHERE b.id = ?
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// related blogs
export const getRelatedBlog = async (req, res, next) => {
  try {
    const { category_id } = req.params;

    const [rows] = await mySqlDB.query(
      `
      SELECT 
        b.*,
        c.name AS category_name,
        c.slug AS category_slug,
        u.name AS author_name,
        u.avatar AS author_avatar,
        u.role AS author_role
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN users u ON b.author_id = u.id
      WHERE b.category_id = ?
      ORDER BY b.created_at DESC
      LIMIT 5
      `,
      [category_id],
    );

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// get category by slug
export const getBlogByCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const [blogs] = await mySqlDB.query(
      `
      SELECT 
        b.*,
        c.name AS category_name,
        c.slug AS category_slug,
        u.name AS author_name,
        u.avatar AS author_avatar,
        u.role AS author_role
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN users u ON b.author_id = u.id
      WHERE c.slug = ?
      ORDER BY b.created_at DESC
      LIMIT 5
      `,
      [slug],
    );

    res.status(200).json({
      success: true,
      category: {
        name: blogs[0]?.category_name,
        slug: blogs[0]?.category_slug,
      },
      data: blogs,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

// search result

export const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    const [blogs] = await mySqlDB.query(
      `
      SELECT 
        b.*,
        c.name AS category_name,
        c.slug AS category_slug,
        u.name AS author_name,
        u.avatar AS author_avatar,
        u.role AS author_role
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN users u ON b.author_id = u.id
      WHERE 
        b.title LIKE ? 
        OR b.content LIKE ?
        OR c.name LIKE ?
      ORDER BY b.created_at DESC
      `,
      [`%${q}%`, `%${q}%`, `%${q}%`],
    );

    res.status(200).json({
      success: true,
      total: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};
