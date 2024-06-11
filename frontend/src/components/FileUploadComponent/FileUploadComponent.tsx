import { useUploadFileMutation } from "@src/redux/api/userOrders.api";
import styles from "./FileUploadComponent.module.scss";
import React, { useState } from "react";

export type FileUploadComponentProps = { orderId: number };

export const FileUploadComponent = ({ orderId }: FileUploadComponentProps) => {
  const [files, setFiles] = useState([]);
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("orderId", orderId);
    for (let file of files) {
      formData.append("files", file);
    }
    await uploadFile(formData);
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
        {isLoading ? <CircularProgress size={24} /> : "Upload Files"}
      </button>
      {error && <div>Error uploading file</div>}
    </div>
  );
};

export default FileUploadComponent;
