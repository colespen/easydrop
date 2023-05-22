import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { DragDropFileProps } from "../datatypes/prop-interfaces";
import { DragDropEvent } from "../datatypes/types";
import "./DragAndDrop.css";

const DragDropFile = ({ setFileList, setUploadStatus }: DragDropFileProps) => {
  const [isDrag, setIsDrag] = useState<SetStateAction<boolean>>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFileList(e.target.files);
    }
    setUploadStatus("");
  };

  const handleDrag = (e: DragDropEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDrag(true);
    } else if (e.type === "dragleave") {
      setIsDrag(false);
    }
  };

  const handleFileDrop = (e: DragDropEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);

    // drop at least one file
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileList(e.dataTransfer.files);
    }
    setUploadStatus("");
  };

  const onButtonClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
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
          <p>drag & drop file(s) or click</p>
          <button className="select-button" onClick={onButtonClick}>
            select file(s)
          </button>
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
};

export default DragDropFile;
