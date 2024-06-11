import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Основной цвет
    },
    secondary: {
      main: "#ff9800", // Вторичный цвет
    },
    background: {
      default: "#f5f5f5", // Цвет фона
    },
    text: {
      primary: "#212121", // Основной цвет текста
      secondary: "#757575", // Вторичный цвет текста
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
