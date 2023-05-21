import { ChangeEvent, useEffect, useState } from "react";
import { uploadFiles } from "../services/fileUpload";
import "./FileUploadForm.css";
import DragDropFile from "./DragAndDrop";

const FileUploadForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [filesArray, setFilesArray] = useState<any>([]);

  console.log("filesArray:", filesArray)

  useEffect(() => {
    // FileList is an obj ... need to spread this to get array
    const newFiles = fileList ? [...fileList] : [];
    setFilesArray((prev: never) => [...prev, ...newFiles]);
  }, [fileList]);

  const handleSetDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    uploadFiles(description, filesArray);
  };

  return (
    <>
      <h2>UPLOAD SOME SWEET FILES</h2>
      <div className="form-container">
        <div
          className="form-main"
          // action="/upload_files"
          // encType="multipart/form-data"
        >
          <div className="description-input">
            <label>file description</label>
            <input
              id="description"
              type="text"
              alt="description input"
              placeholder="..."
              onChange={handleSetDescription}
            />
          </div>
          <DragDropFile
            setFileList={setFileList}
          />
          <button type="submit" onClick={handleSubmit}>
            upload
          </button>
        </div>
      </div>
    </>
  );
};

export default FileUploadForm;
