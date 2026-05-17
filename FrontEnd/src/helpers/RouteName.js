export const RouteIndex = "/";
export const RouteSignIn = "/sign-in";
export const RouteSignUp = "/sign-up";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteBlogSection = "/blog-section";
export const RouteAbout = "/about";
export const RouteContact = "/contact";
export const RouteService = "/service";

export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/category/edit/${category_id}`;
  } else {
    return `/category/edit/:category_id`;
  }
};

export const RouteBlog = "/blogs";
export const RouteBlogAdd = "/blog/add";
export const RouteBlogEdit = (blogid) => {
  if (blogid) {
    return `/blog/edit/${blogid}`;
  } else {
    return `/blog/edit/:blogid`;
  }
};

// RouteBlogDetails.js
export const RouteBlogDetails = (blogId) => {
  if (!blogId) {
    return "/blog/:id";
  } else {
    return `/blog/${blogId}`;
  }
};

// category by slug
export const RouteBlogByCategory = (slug) => {
  if (!slug) {
    return "/category/:slug";
  }
  return `/category/${slug}`;
};

// // search result query
// export const RouteSearch = (q) => {
//   return `/search?q=${q}`;
// };
export const RouteSearch = "/search";

// comment
export const RouteCommentsDetails = "/comments";

// delete comment
export const RouteDeleteComment = (id) => {
  return `/backend/comment/delete/${id}`;
};

// Users
export const RouteUsers = "/users";

// delete comment
export const RouteDeleteUser = (id) => {
  return `/backend/user/delete/${id}`;
};
