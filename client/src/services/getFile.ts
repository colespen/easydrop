import axios from "axios";

const getFile = async (filename: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/uploadfiles/${filename}`,
      { responseType: "blob" } // blob instead of string
    );
    console.log("response:", response);

    if (response.status === 200) {
      const fileBlob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const fileURL = URL.createObjectURL(fileBlob);

      console.log("fileBlob:", fileBlob);
      console.log("fileURL:", fileURL);
      
      window.open(fileURL, "_blank", "noreferrer");
    }
  } catch (err: any) {
    console.log("Error:", err);
  }
};

export { getFile };
