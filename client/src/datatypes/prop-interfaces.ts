import { Dispatch, SetStateAction } from "react";

export interface DragDropFileProps {
    setFileList: Dispatch<SetStateAction<FileList | null>>;
  }