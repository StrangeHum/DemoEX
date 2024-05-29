import { useUploadFileMutation } from "@src/redux/api/userOrders.api";
import styles from "./FileUploadComponent.module.scss";
import React, { useState } from "react";

export type FileUploadComponentProps = {};

export const FileUploadComponent = ({}: FileUploadComponentProps) => {
  const [file, setFile] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [uploadFile, { isLoading, error }] = useUploadFileMutation();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file && orderId) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId);

      console.log(formData);

      uploadFile(formData);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Order ID"
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload File"}
      </button>
      {error && <div>Error uploading file</div>}
    </div>
  );
};

export default FileUploadComponent;
