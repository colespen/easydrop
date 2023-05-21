"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const storageEngine_1 = require("./storageEngine");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
////    cors no config accepts all origins/headers
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static("uploads"));
app.get("/uploadfiles/:filename", (req, res) => {
    const filepath = path_1.default.join(__dirname.slice(0, -5), // hack
    `/uploads/${req.params.filename}`);
    console.log("filepath:", filepath);
    // res.sendFile(filepath); // TODO: no file reading on client for now...
    res.send(filepath);
});
// array for multiple files. "files" arg depends on name of input
app.post("/uploadfiles", storageEngine_1.upload.array("files"), // use the upload middleware
(req, res) => {
    if (!req.files) {
        return res.status(400).send("no file was uploaded");
    }
    console.log("req.body.description", req.body.description); // text input
    console.log("req.files", req.files); // files attached[]
    res.json({ files: req.files, description: req.body.description });
});
// function uploadFiles(req: Request, res: Response) {
//     console.log(req.body)
// }
app.listen(port, () => {
    console.log(`Server listening on port ${port} `);
});
