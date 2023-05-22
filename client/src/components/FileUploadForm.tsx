import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { uploadFiles } from "../services/uploadFiles";
import DragDropFile from "./DragAndDrop";
import Status from "./Message";
import ProgressBar from "./ProgressBar";
import FileViewer from "./FileViewer";
import { UploadedFiles } from "../datatypes/types";
import "./FileUploadForm.css";

const FileUploadForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [filesArray, setFilesArray] = useState<any>([]);
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    description: "",
    files: [],
  });

  useEffect(() => {
    // FileList is an obj ... need to spread this to get array
    const newFiles = fileList ? [...fileList] : [];
    setFilesArray((prev: never) => [...prev, ...newFiles]);
  }, [fileList]);
  // console.log("filesArray:", filesArray);
  const handleSetDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = useMemo(
    () => (e: any) => {
      e.preventDefault();
      if (filesArray.length === 0) {
        setUploadStatus("no files dude");
        return;
      }
      uploadFiles(
        description,
        filesArray,
        setOnSuccess,
        setUploadStatus,
        setUploadPercentage,
        setUploadedFiles
      );
      setFilesArray([]);
      setDescription("");
    },
    [description, filesArray]
  );

  return (
    <>
      <FileViewer uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
      <h2>UPLOAD SOME SWEET FILES</h2>
      <Status status={uploadStatus} filesArray={filesArray} />
      <div className="form-container">
        <div className="form-main">
          <div className="description-input">
            <label>file description</label>
            <input
              id="description"
              type="text"
              alt="description input"
              placeholder="..."
              value={description}
              onChange={handleSetDescription}
            />
          </div>
          <DragDropFile
            setFileList={setFileList}
            setUploadStatus={setUploadStatus}
          />
          <button type="submit" onClick={handleSubmit}>
            upload
          </button>
        </div>
        <ProgressBar uploadPercentage={uploadPercentage} />
        {/* TODO: use library instead for progress bar, fetch doesnt help */}
      </div>
    </>
  );
};

export default FileUploadForm;
