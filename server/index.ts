import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { upload } from "./storageEngine";
// import path from 'path'

const app: Express = express();
const port: string | number = process.env.PORT || 8001;

////    cors no config accepts all origins/headers
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send("hiyaaa");
});

// console.log(__dirname)

// array for multiple files. "files" arg depends on name of input
app.post(
  "/uploadfiles",
  upload.array("files"), // use the upload middleware
  (req: Request, res: Response) => {
    if (!req.files) {
      return res.status(400).send("no file was uploaded");
    }
    console.log("req.body", req.body.description); // text input
    console.log("req.files", req.files); // files attached[]
    res.send(req.files);
  }
);
// function uploadFiles(req: Request, res: Response) {
//     console.log(req.body)
// }

app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
