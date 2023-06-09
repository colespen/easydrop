const Status = ({
  status,
  filesArray,
}: {
  status: string;
  filesArray: File[];
}) => {
  const filenameList = filesArray.map((file: File, i: number) => (
    <li key={file.name + i}>{file.name}</li>
  ));

  return (
    <div className="messages">
      {status ? (
        <h3 className={`upload-message`}>{status}</h3>
      ) : (
        <ul className="filename-list">{filenameList}</ul>
      )}
    </div>
  );
};

export default Status;
