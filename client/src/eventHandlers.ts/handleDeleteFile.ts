import { UploadedFiles } from "../datatypes/types";
import { deleteFile } from "../services/deleteFile";

const handleDeleteFile = async (
  filename: string,
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFiles>>
) => {
  try {
    await deleteFile(filename);
    setUploadedFiles((prev: any) => ({
      ...prev,
      files: prev.files.filter((file: any) => file.filename !== filename),
    }));
  } catch (error) {
    throw Error("Error deleting file:" + error);
  }
};

export { handleDeleteFile };
