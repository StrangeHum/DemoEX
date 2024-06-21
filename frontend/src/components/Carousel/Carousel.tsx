import React, { useState } from "react";
import { IconButton, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box className="carousel">
      <IconButton
        className="carousel-button prev-button"
        onClick={goToPrevious}
      >
        <ArrowBack />
      </IconButton>
      <Box className="carousel-track-container">
        <img
          src={images[currentIndex]}
          alt="carousel"
          style={{ width: "100%" }}
        />
      </Box>
      <IconButton className="carousel-button next-button" onClick={goToNext}>
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Carousel;

export default Carousel;
