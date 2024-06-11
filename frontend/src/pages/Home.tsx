import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Heatmap } from "@src/components/Heatmap";

export const Home = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Нарушениям.Нет
      </Typography>
      <Typography variant="h5">
        Наш портал представляет собой информационную систему для помощи полиции
        по своевременной фиксации нарушений правил дорожного движения.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Подать заявление
      </Button>
      <Typography variant="h4" gutterBottom>
        Будь ответственным гражданином!
      </Typography>
      <Heatmap />
    </Container>
  );
};
