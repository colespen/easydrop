"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const storageEngine_1 = require("./storageEngine");
// import path from 'path'
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
////    cors no config accepts all origins/headers
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("hiyaaa");
});
// console.log(__dirname)
// array for multiple files. "files" arg depends on name of input
app.post("/uploadfiles", storageEngine_1.upload.array("files"), // use the upload middleware
(req, res) => {
    if (!req.files) {
        return res.status(400).send("no file was uploaded");
    }
    console.log("req.body", req.body.description); // text input
    console.log("req.files", req.files); // files attached[]
    res.send(req.files);
});
// function uploadFiles(req: Request, res: Response) {
//     console.log(req.body)
// }
app.listen(port, () => {
    console.log(`Server listening on port ${port} `);
});
