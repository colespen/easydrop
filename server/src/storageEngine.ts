import multer, { Multer, StorageEngine } from "multer";

const storageEngine: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const id = Date.now().toString().slice(6, 10);
    cb(null, id + "-" + file.originalname);
  },
});

const upload: Multer = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 }, //10MB
});

export { upload };
