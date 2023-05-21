import axios from "axios";
import { UploadedFiles } from "../datatypes/types";

const uploadFiles = async (
  description: string,
  filesArray: File[],
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
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
      "http://localhost:8001/uploadfiles",
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
    console.log("fileName:, description:", files, description);

    setUploadedFiles({ description, files });
    setSuccess(true);
    setUploadStatus("Upload Successful");
  } catch (err: any) {
    console.error(err.message);
    err.response.status === 500
      ? setUploadStatus("Server error")
      : setUploadStatus(err);
  }
};

export { uploadFiles };
