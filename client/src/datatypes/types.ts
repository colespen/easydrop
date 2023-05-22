export type UploadedFiles = {
  description: "";
  files: any[];
};

export type DragDropEvent =
  | React.DragEvent<HTMLFormElement>
  | React.DragEvent<HTMLDivElement>;

export type ButtonEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.TouchEvent<HTMLButtonElement>;
