import { useState } from "react";
import "./Caroussel.css";

// Importez vos images
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpg";
import img6 from "../../assets/images/img6.jpg";

const images = [
  { id: 1, src: img1 },
  { id: 2, src: img2 },
  { id: 3, src: img3 },
  { id: 4, src: img4 },
  { id: 5, src: img5 },
  { id: 6, src: img6 },
];

type SlidePosition = "prev" | "active" | "next";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const getSlidePosition = (index: number): SlidePosition | null => {
    if (index === currentIndex) return "active";
    if (index === (currentIndex + 1) % images.length) return "next";
    if (index === (currentIndex - 1 + images.length) % images.length)
      return "prev";
    return null;
  };

  return (
    <div className="carousel-container">
      {images.map((image, index) => {
        const position = getSlidePosition(index);
        return position ? (
          <div key={image.id} className={`slide ${position}`}>
            <img src={image.src} alt={`Slide ${index + 1}`} />
          </div>
        ) : null;
      })}

      <div className="carousel-controls">
        <button onClick={prevSlide} className="carousel-button" type="button">
          ❮
        </button>
        <button onClick={nextSlide} className="carousel-button" type="button">
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
