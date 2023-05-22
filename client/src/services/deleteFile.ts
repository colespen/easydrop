import axios from "axios";

const deleteFile = async (filename: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER}/uploadfiles/delete/${filename}`
    );

    if (response.status === 200) {
      console.log("file destroyed");
    }
  } catch (err: any) {
    console.log("Error:", err);
  }
};

export { deleteFile };
