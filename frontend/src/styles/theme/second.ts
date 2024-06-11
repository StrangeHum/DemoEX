import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF8C00", // Основной оранжевый цвет
    },
    secondary: {
      main: "#FFA500", // Вторичный оранжевый цвет
    },
    background: {
      default: "#FFF8E1", // Цвет фона (светлый кремовый)
    },
    text: {
      primary: "#212121", // Основной цвет текста (темный)
      secondary: "#757575", // Вторичный цвет текста (серый)
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
