import jwt from "jsonwebtoken";

export const Authenticate = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
