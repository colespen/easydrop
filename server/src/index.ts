import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { upload } from "./storageEngine";
import path from "path";

const app: Express = express();
const port: string | number = process.env.PORT || 8001;

////    cors no config accepts all origins/headers
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/uploadfiles/:filename", (req: Request, res: Response) => {
  const filepath = path.join(
    __dirname.slice(0, -5), // hack
    `/uploads/${req.params.filename}`
  );
  console.log("filepath:", filepath);
  // res.sendFile(filepath); // TODO: no file reading on client for now...
  res.send(filepath);
});

// array for multiple files. "files" arg depends on name of input
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
// function uploadFiles(req: Request, res: Response) {
//     console.log(req.body)
// }

app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
