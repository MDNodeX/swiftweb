import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedFile = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  if (!allowedFile.includes(file.mimetype)) {
    cb(new Error("Only images are allowed"), false);
  } else {
    cb(null, true);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
