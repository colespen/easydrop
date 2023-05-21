import axios from "axios";

const getFile = async (filename: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/uploadfiles/${filename}`
      );
      console.log("response.data:", response.data);

      if (response.status < 400) {
        const fileURL = new URL(response.data, 'file:');
        window.open(fileURL.href, "_blank", "noreferrer");
      }
    } catch (err: any) {
      console.log("Error:", err);
    }
  };

  export {getFile}