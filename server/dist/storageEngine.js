"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storageEngine = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const id = Date.now().toString().slice(6, 10);
        cb(null, id + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storageEngine,
    limits: { fileSize: 10000000 }, //10MB
});
exports.upload = upload;
