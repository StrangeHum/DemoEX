import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

function AdminPanel() {
  // Здесь можно добавить вызов API для получения списка заявлений
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Панель администратора
      </Typography>
      {/* Пример списка заявлений */}
      <Box mt={3}>
        <Typography variant="h5">Заявления</Typography>
        <Box mt={2} mb={2} p={2} border={1}>
          <Typography variant="h6">Нарушение №12345</Typography>
          <Typography>Статус: Новый</Typography>
          <Typography>Гос номер автомобиля: A123BC77</Typography>
          <Typography>Описание: Пример описания нарушения...</Typography>
          <Button variant="contained" color="success" sx={{ mt: 1 }}>
            Принять
          </Button>
          <Button variant="contained" color="error" sx={{ mt: 1, ml: 2 }}>
            Отклонить
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminPanel;