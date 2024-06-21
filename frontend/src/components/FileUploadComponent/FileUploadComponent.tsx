import { useUploadFileMutation } from "@src/redux/api/userOrders.api";
import styles from "./FileUploadComponent.module.scss";
import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@src/redux/auth/authSlice";

export type FileUploadComponentProps = { orderId: string };

export const FileUploadComponent = ({ orderId }: FileUploadComponentProps) => {
  const accessToken = useSelector(selectAccessToken);
  const [files, setFiles] = useState([]);
  const [uploadFile, { isLoading, error }] = useUploadFileMutation();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    // // formData.append("orderId", orderId);
    formData.append("file", files[0]);
    // // for (let file of files) {
    // //   formData.append("file", file);
    // // }
    // await uploadFile(formData);

    // const form = new FormData();
    // form.append(
    //   "file",
    //   "D:\\Загрузки\\Img\\9aaa8840d49f2e2600d15aaac17332eb.jpg"
    // );

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    options.body = formData;

    // await uploadFile(formData);
    fetch("http://localhost:3000/orders/uploadFile", options)
      .then((response) => console.log("получен ответ"))
      .catch((e) => console.log("err"));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Upload Files"}
      </button>
      {error && <div>Error uploading file</div>}
    </div>
  );
};

export default FileUploadComponent;
