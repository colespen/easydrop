export type UploadedFiles = {
  description: "";
  files: any[];
};

export type DragDropEvent =
  | React.DragEvent<HTMLFormElement>
  | React.DragEvent<HTMLDivElement>;
