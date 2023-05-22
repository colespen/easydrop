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
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
dotenv_1.default.config();
//// cors no config accepts all origins/headers
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static("uploads"));
// get individual file to be read by client
app.get("/uploadfiles/:filename", (req, res, next) => {
    const filepath = path_1.default.join(__dirname.slice(0, -5), // bad hack - removes /dist
    `/uploads/${req.params.filename}`);
    try {
        res.sendFile(filepath);
    }
    catch (err) {
        // will pass error to error-handling middleware
        next(err);
    }
    console.log("filepath:", filepath);
});
// upload array for multiple files. "files" arg depends on name of input
app.post("/uploadfiles", storageEngine_1.upload.array("files"), // use the upload middleware
(req, res) => {
    if (!req.files) {
        return res.status(400).send("no file was uploaded");
    }
    console.log("req.body.description", req.body.description); // text input
    console.log("req.files", req.files); // files attached[]
    res.json({ files: req.files, description: req.body.description });
});
// del individual file
app.delete("/uploadfiles/delete/:filename", (req, res) => {
    const filepath = path_1.default.join(__dirname.slice(0, -5), `/uploads/${req.params.filename}`);
    fs_1.default.unlink(filepath, (err) => {
        if (err)
            throw err;
        console.log("file destroyed");
        res.send("file destroyed");
    });
});
// error handling middleware
app.use((err, req, res, next) => {
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
