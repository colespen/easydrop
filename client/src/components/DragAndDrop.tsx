import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./DragAndDrop.css";

interface DragDropFileProps {
  setFileList: Dispatch<SetStateAction<FileList | null>>;
}

function DragDropFile({ setFileList }: DragDropFileProps) {
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const handleFileClick = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
        setFileList(e.target.files);
    }
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDrag(true);
    } else if (e.type === "dragleave") {
      setIsDrag(false);
    }
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);

    // drop at least one file
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileList(e.dataTransfer.files);
    }
  };


  return (
    <form
      id="form-file-upload"
      // action="/upload_files"
      // encType="multipart/form-data"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        id="input-file-upload"
        type="file"
        multiple
        onChange={handleFileClick}
      />
      <label
        id="label-file-upload"
        className={isDrag ? "drag-active" : ""}
        htmlFor="input-file-upload"
      >
        <div>
          <p>drag & drop file(s) or</p>
          <button className="select-button">click</button>
        </div>
      </label>
      {/* this element is invisible, just listens to drag events */}
      {isDrag && (
        <div
          id="drag-overlay"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleFileDrop}
        ></div>
      )}
    </form>
  );
}

export default DragDropFile;
