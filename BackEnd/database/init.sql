-- ============================================================
-- Database initialisation script
-- Run automatically on app startup via index.js
-- All statements use IF NOT EXISTS so they are safe to re-run
-- ============================================================

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id`          VARCHAR(36)  NOT NULL,
  `name`        VARCHAR(255) NOT NULL,
  `email`       VARCHAR(255) NOT NULL,
  `password`    VARCHAR(255) NOT NULL,
  `role`        VARCHAR(50)  DEFAULT NULL,
  `avatar`      VARCHAR(500) DEFAULT NULL,
  `bio`         TEXT         DEFAULT NULL,
  `is_verified` TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories table
CREATE TABLE IF NOT EXISTS `categories` (
  `id`          INT          NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(255) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL,
  `description` TEXT         DEFAULT NULL,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blogs table
CREATE TABLE IF NOT EXISTS `blogs` (
  `id`               VARCHAR(36)   NOT NULL,
  `author_id`        VARCHAR(36)   DEFAULT NULL,
  `category_id`      INT           DEFAULT NULL,
  `title`            VARCHAR(500)  NOT NULL,
  `slug`             VARCHAR(500)  NOT NULL,
  `featured_image`   VARCHAR(1000) DEFAULT NULL,
  `content`          LONGTEXT      NOT NULL,
  `status`           VARCHAR(50)   NOT NULL DEFAULT 'draft',
  `meta_title`       VARCHAR(500)  DEFAULT NULL,
  `meta_description` TEXT          DEFAULT NULL,
  `created_at`       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_blogs_slug` (`slug`),
  KEY `fk_blogs_author`   (`author_id`),
  KEY `fk_blogs_category` (`category_id`),
  CONSTRAINT `fk_blogs_author`   FOREIGN KEY (`author_id`)   REFERENCES `users`      (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_blogs_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comments table
CREATE TABLE IF NOT EXISTS `comments` (
  `id`         VARCHAR(36) NOT NULL,
  `blog_id`    VARCHAR(36) DEFAULT NULL,
  `user_id`    VARCHAR(36) DEFAULT NULL,
  `content`    TEXT        NOT NULL,
  `status`     VARCHAR(50) NOT NULL DEFAULT 'approved',
  `created_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_blog` (`blog_id`),
  KEY `fk_comments_user` (`user_id`),
  CONSTRAINT `fk_comments_blog` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Likes table
CREATE TABLE IF NOT EXISTS `likes` (
  `id`         VARCHAR(36) NOT NULL,
  `blog_id`    VARCHAR(36) NOT NULL,
  `user_id`    VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_likes_blog_user` (`blog_id`, `user_id`),
  KEY `fk_likes_blog` (`blog_id`),
  KEY `fk_likes_user` (`user_id`),
  CONSTRAINT `fk_likes_blog` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
