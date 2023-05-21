import { UploadedFiles } from "../datatypes/types";
import { getFile } from "../services/getFile";

const FileViewer = ({ uploadedFiles }: { uploadedFiles: UploadedFiles }) => {

  const uploadedFilesList = uploadedFiles.files.map((el, i) => {
    // console.log(el);
    return (
      <li key={i + el.originalname}>
        <a onClick={() => getFile(el.filename)}>{el.originalname}</a>
      </li>
    );
  });

  return (
    <div className="file-viewer">
      <h2>{uploadedFiles.description}</h2>
      <ul>{uploadedFilesList}</ul>
    </div>
  );
};

export default FileViewer;
