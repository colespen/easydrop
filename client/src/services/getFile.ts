import axios from "axios";

const getFile = async (filename: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/uploadfiles/${filename}`
      );
      console.log("response:", response);

      if (response.status < 400) {
        // const fileURL = new URL(response.data, 'file:');
       
      }
    } catch (err: any) {
      console.log("Error:", err);
    }
  };

  export {getFile}