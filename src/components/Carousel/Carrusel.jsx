/* eslint-disable react/prop-types */

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import Datos from "./Datos";
import Cards from "./Cards";
import { RiCloseFill } from "react-icons/ri";

const Carrusel = ({ className, style, onClick }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const handleCardClick = (dato) => {
    setSelectedCard(dato);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div className="bg-gray-100 p-2">
      <div
        className={` mb-[10%] mx-[22%] shadow-2xl relative  cursor-pointer ${className}`}
        style={style}
        onClick={onClick}
      >
        <Slider {...settings}>
          {Datos.map((dato) => (
            <div key={dato.id} onClick={() => handleCardClick(dato)}>
              <Cards imagen={dato.imagen} />
            </div>
          ))}
        </Slider>
        {selectedCard && (
          <PopupCard
            imagen={selectedCard.imagen}
            titulo={selectedCard.titulo}
            descripcion={selectedCard.descripcion}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

Carrusel.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow slick-prev ${className}`}
      style={{ ...style, left: "10px", zIndex: "1" }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow slick-next ${className}`}
      style={{ ...style, right: "10px", zIndex: "1" }}
      onClick={onClick}
    />
  );
};

const PopupCard = ({ imagen, titulo, descripcion, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center   justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-[90%] xl:max-w-[60%]">
        <div className="xl:flex items-center">
          <img
            src={imagen}
            className=" xl:w-[300px] xl:h-[300px] object-cover mr-4 rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold ">{titulo}</h2>
            <p className="text-gray-700 mt-8">{descripcion}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute xl:top-[27%] top-[10%] right-[0%] xl:right-[20%]  text-black hover:text-gray-700 focus:outline-none"
        >
          <RiCloseFill className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

PopupCard.propTypes = {
  imagen: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Carrusel;
