import React from "react";
import { AddressInput } from "@components/AddressInput";
import { Carousel } from "@components/Carousel";
import { IncidentForm } from "@components/IncidentForm";
import { Container, Typography } from "@mui/material";
import { OrderType } from "@src/types";

export const CreateOrderPage = () => {
  const sendFoo = () => {
    const form = new FormData();
    form.append("files", ""); //Несколько таких файлов
    form.append("description", "description");
    form.append("numberCar", "numberCar");
    form.append("address", "address");
  };

  const images = ["image1.jpg", "image2.jpg", "image3.jpg"]; // Добавьте пути к вашим изображениям

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Создание заявления
      </Typography>
      <AddressInput />
      {/* <Carousel images={images} /> */}
      <IncidentForm />
    </Container>
  );
};

export default CreateOrderPage;
