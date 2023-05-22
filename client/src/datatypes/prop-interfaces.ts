import { Dispatch, SetStateAction } from "react";
import { UploadedFiles } from "./types";

export interface DragDropFileProps {
  setFileList: Dispatch<SetStateAction<FileList | null>>;
  setUploadStatus: Dispatch<SetStateAction<string>>;
}

export interface FileViewerProps {
  uploadedFiles: UploadedFiles;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFiles>>;
}