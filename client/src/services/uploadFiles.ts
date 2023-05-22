import axios from "axios";
import { UploadedFiles } from "../datatypes/types";

const uploadFiles = async (
  description: string,
  filesArray: File[],
  setUploadStatus: React.Dispatch<React.SetStateAction<string>>,
  setUploadPercentage: React.Dispatch<React.SetStateAction<number>>,
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFiles>>
) => {
  const formData = new FormData();
  formData.append("description", description);

  filesArray.forEach((file: File) => {
    formData.append("files", file, file.name);
  });
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/uploadfiles`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent && progressEvent.total) {
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
          setTimeout(() => {
            setUploadPercentage(0);
            setUploadStatus("");
          }, 2000);
        },
      }
    );
    const { description, files } = response.data;

    setUploadedFiles((prev: UploadedFiles) => ({
      ...prev,
      description: prev.description || description,
      files: [...prev.files, ...files],
    }));
    setUploadStatus("Upload Successful");
  } catch (err: any) {
    console.error(err.message);
    err.response.status === 500
      ? setUploadStatus("Server error")
      : setUploadStatus(err);
  }
};

export { uploadFiles };
