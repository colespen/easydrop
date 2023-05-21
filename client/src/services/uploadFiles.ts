const uploadFiles = async (
  description: string,
  filesArray: File[],
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setUploadStatus: React.Dispatch<React.SetStateAction<string>>,
  setUploadPercentage: React.Dispatch<React.SetStateAction<number>>
) => {
  const formData = new FormData();
  formData.append("description", description);

  filesArray.forEach((file: File) => {
    formData.append("files", file, file.name);
  });

  try {
    const response = await fetch("http://localhost:8001/uploadfiles", {
      method: "POST",
      body: formData,
      //  "Content-Type": "multipart/form-data" - done automatically
    });
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response body reader");
    }
    const contentLength = Number(response.headers.get("Content-Length"));
    let uploadedBytes = 0;
    let isFinished = false;

    while (!isFinished) {
      const { done, value } = await reader.read();
      if (done) {
        isFinished = true;
        break;
      }
      uploadedBytes += value?.length || 0;
      const progress = (uploadedBytes / contentLength) * 100;
      setUploadPercentage(progress);
    }
    // const { value } = await reader.read();
    // console.log("value:", value);
    setUploadStatus("upload Successful :)))");
    setSuccess(true);
  } catch (err: unknown) {
    console.log(err);
    setUploadStatus("Server Error!");
  }
};

export { uploadFiles };
