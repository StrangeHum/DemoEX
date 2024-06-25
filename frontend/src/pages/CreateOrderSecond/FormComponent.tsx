import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addFile, removeFile, clearFiles } from "@src/redux/fileSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useCreateOrderMutation } from "@src/redux/api/userOrders.api";
import { baseUrl } from "@src/redux/api/baseQuery";
import { selectAccessToken } from "@src/redux/auth/authSlice";

const FormComponent = () => {
  //   const [createOrder, {}] = useCreateOrderMutation();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const [previewFiles, setPreviewFiles] = useState([]);
  const accessToken = useSelector(selectAccessToken);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("numberCar", data.numberCar);
    formData.append("address", data.address);
    files.forEach((file) => formData.append("files", file));

    try {
      //   await axios.post("YOUR_API_ENDPOINT", formData);
      //   createOrder(formData);
      await axios.post(baseUrl + "orders/create", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      reset();
      dispatch(clearFiles());
      setPreviewFiles([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    newFiles.forEach((file) => dispatch(addFile(file)));
    setPreviewFiles((prevFiles) => [
      ...prevFiles,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveFile = (index) => {
    dispatch(removeFile(index));
    setPreviewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField label="Description" {...register("description")} required />
      <TextField label="Number Car" {...register("numberCar")} required />
      <TextField label="Address" {...register("address")} required />
      <Button variant="contained" component="label">
        Upload Files
        <input type="file" hidden multiple onChange={handleFileChange} />
      </Button>
      {previewFiles.length > 0 && (
        <ImageList cols={3}>
          {previewFiles.map((file, index) => (
            <ImageListItem key={index}>
              <img src={file} alt={`preview-${index}`} loading="lazy" />
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveFile(index)}
                sx={{ position: "absolute", top: 0, right: 0, color: "white" }}
              >
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default FormComponent;
