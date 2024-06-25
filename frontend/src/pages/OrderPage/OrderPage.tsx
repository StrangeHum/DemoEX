import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  useUserOrdersQuery,
  useGetFileQuery,
} from "@src/redux/api/userOrders.api";
import { DataFileOrder } from "@src/types";
import { Box, Typography, CircularProgress } from "@mui/material";
import styles from "./OrderPage.module.scss"; // SCSS module
import { FetchImage, FileDisplay } from "@components/FetchImage/FetchImage";

export const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Проверка на валидность id
  if (!id) {
    return <div>Ошибка: Некорректный ID заявления</div>;
  }
  // Получение данных о заявлении
  const { data: orderData, isError, isLoading } = useUserOrdersQuery();

  // Обработка ошибок и состояний загрузки
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !orderData) {
    return <div>Ошибка при загрузке данных</div>;
  }

  // Данные заявки
  const order = orderData.orders.find((order) => order.id === Number(id));

  if (!order) {
    return <div>Заявление не найдено</div>;
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4">Информация о заявлении</Typography>
      <Typography variant="h6">Описание: {order.description}</Typography>
      <Typography variant="h6">Номер машины: {order.numberCar}</Typography>
      <Typography variant="h6">Адрес: {order.address}</Typography>
      <Typography variant="h6">Статус: {order.status.title}</Typography>
      <Typography variant="h5">Файлы</Typography>
      {/* {(order.files &&
        order.files.map((file) => (
          <FileComponent key={file.filename} file={file} />
        ))) ||
        "Не прикреплены"} */}
      <FileDisplay fileId={4} />
    </Box>
  );
};

const FileComponent = ({ file }: { file: DataFileOrder }) => {
  const {
    data: fileData,
    isLoading,
    isError,
  } = useGetFileQuery({ idOrder: file.orderId, idFile: file.id });

  console.log(file);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !fileData) {
    return <div>Ошибка при загрузке файла</div>;
  }

  const url = URL.createObjectURL(fileData);

  return (
    <Box>
      <Typography>{file.filename}</Typography>
      <img src={url} alt={file.filename} />
    </Box>
  );
};
