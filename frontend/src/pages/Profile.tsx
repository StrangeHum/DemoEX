import { selectCurrentUser } from "@src/redux/auth/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user || user.firstName === "") {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 500, padding: 2 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Профиль
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Имя:</strong> {user.firstName}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Отчество:</strong> {user.secondName}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Фамилия:</strong> {user.surname}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Телефон:</strong> {user.phone}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Роль:</strong> {user.role}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              alert("Функция изменения данных пока не реализована")
            }
          >
            Изменить данные
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
