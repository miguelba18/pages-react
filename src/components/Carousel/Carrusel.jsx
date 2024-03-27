/* eslint-disable react/prop-types */


import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import Datos from './Datos';
import Cards from './Cards';
import { RiCloseFill } from "react-icons/ri";


const Carrusel = ({ className, style, onClick }) => {

    const [selectedCard, setSelectedCard] = useState(null); // Estado para controlar qué tarjeta está seleccionada
    

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    // Función para manejar el clic en una tarjeta
    const handleCardClick = (dato) => {
        setSelectedCard(dato); // Establece la tarjeta seleccionada
    };

    // Función para cerrar la ventana emergente
    const handleClosePopup = () => {
        setSelectedCard(null); // Borra la tarjeta seleccionada
    };

    return (
        <div className={`h-[30%] w-[60%] mb-[10%] mx-[22%] shadow-2xl relative ${className}`} style={style} onClick={onClick}>
            <Slider {...settings}>
                {Datos.map((dato) => (
                    <div key={dato.id} onClick={() => handleCardClick(dato)}>
                        <Cards
                            imagen={dato.imagen}
                        />
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
    );
};

// Define PropTypes para Carrusel
Carrusel.propTypes = {
    className: PropTypes.string, // className es de tipo string
    style: PropTypes.object, // style es de tipo object
    onClick: PropTypes.func // onClick es de tipo función
};

// Componente de flecha personalizada para retroceder
const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slick-arrow slick-prev ${className}`} // Agrega la clase slick-prev
            style={{ ...style, left: '10px', zIndex: '1' }} // Personaliza el estilo
            onClick={onClick}
        />
    );
};

// Componente de flecha personalizada para avanzar
const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slick-arrow slick-next ${className}`} // Agrega la clase slick-next
            style={{ ...style, right: '10px', zIndex: '1' }} // Personaliza el estilo
            onClick={onClick}
        />
    );
};


// Componente de ventana emergente para mostrar la tarjeta seleccionada
const PopupCard = ({ imagen, titulo, descripcion, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-[60%]">
                <div className="flex items-center">
                    <img src={imagen} className="w-[300px] h-[300px] object-cover mr-4 rounded-lg" />
                    <div>
                        <h2 className="text-xl font-semibold">{titulo}</h2>
                        <p className="text-gray-700">{descripcion}</p>
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-20 right-2  text-black hover:text-gray-700 focus:outline-none">
                    <RiCloseFill className='h-10 w-10' />
                </button>

            </div>
        </div>
    );
};


// Define PropTypes para PopupCard
PopupCard.propTypes = {
    imagen: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Carrusel;
