import { UploadedFiles } from "../datatypes/types";
import { handleDeleteFile } from "../eventHandlers.ts/handleDeleteFile";
import { getFile } from "../services/getFile";
import "./FileUploadForm.css";

const FileViewer = ({
  uploadedFiles,
  setUploadedFiles,
}: {
  uploadedFiles: UploadedFiles;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFiles>>;
}) => {
  console.log("uploadedFiles:", uploadedFiles);

  const uploadedFilesList = uploadedFiles.files.map((el, i) => {
    // console.log(el);
    return (
      <li key={i + el.originalname}>
        <a className="uploaded-file-row" onClick={() => getFile(el.filename)}>
          {el.originalname}
        </a>
        <span
          className="delete-button"
          onClick={() => handleDeleteFile(el.filename, setUploadedFiles)}
        >
          x
        </span>
      </li>
    );
  });

  return (
    <>
      <h4>view your files</h4>
      <div className="file-viewer">
        <h3 style={{ color: "#8b91ff" }}>{uploadedFiles.description}</h3>
        <ul>{uploadedFilesList}</ul>
      </div>
    </>
  );
};

export default FileViewer;
