const uploadFiles = (description: string, filesArray: any) => {
  const formData = new FormData();
  formData.append("description", description);
  filesArray.forEach((file: any, i: number) => {
    formData.append("files", file, file.name);
  });
  fetch("http://localhost:8001/uploadfiles", {
    method: "POST",
    body: formData,
  })
    .then((res) => console.log(res))
    .catch((err) => "Error occured up submission: " + err);
};

export { uploadFiles };
