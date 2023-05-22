import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { upload } from "./storageEngine";
import path from "path";
import fs from "fs";

const app: Express = express();
const port: string | number = process.env.PORT || 8001;

dotenv.config();
//// cors no config accepts all origins/headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// get individual file to be read by client
app.get(
  "/uploadfiles/:filename",
  (req: Request, res: Response, next: NextFunction) => {
    const filepath = path.join(
      __dirname.slice(0, -5), // bad hack - removes /dist
      `/uploads/${req.params.filename}`
    );
    try {
      res.sendFile(filepath);
    } catch (err) {
      // will pass error to error-handling middleware
      next(err);
    }
    console.log("filepath:", filepath);
  }
);
// upload array for multiple files. "files" arg depends on name of input
app.post(
  "/uploadfiles",
  upload.array("files"), // use the upload middleware
  (req: Request, res: Response) => {
    if (!req.files) {
      return res.status(400).send("no file was uploaded");
    }
    console.log("req.body.description", req.body.description); // text input
    console.log("req.files", req.files); // files attached[]
    res.json({ files: req.files, description: req.body.description });
  }
);
// del individual file
app.delete("/uploadfiles/delete/:filename", (req: Request, res: Response) => {
  const filepath = path.join(
    __dirname.slice(0, -5), 
    `/uploads/${req.params.filename}`
  );
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log("file destroyed")
    res.send("file destroyed")
  })
});

// error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // handle specific error types if needed
  if (err.code === "ENOENT") {
    // File not found error
    return res.status(404).send("File not found");
  }
  res.status(500).send("Internal server error");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
