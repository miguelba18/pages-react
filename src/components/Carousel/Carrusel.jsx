/* eslint-disable react/prop-types */


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types'; // Importa PropTypes
import Datos from './Datos'; // Importa los datos
import Cards from './Cards'; // Importa el componente Cards

const Carrusel = ({ className, style, onClick }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    return (
        <div className={`h-[30%] w-[60%] mb-[10%] mx-[22%] shadow-2xl relative ${className}`} style={style} onClick={onClick}>
            <Slider {...settings}>
                {Datos.map((dato) => (
                    <div key={dato.id}>
                        <Cards 
                            imagen={dato.imagen} 
                            titulo={dato.titulo} 
                            descripcion={dato.descripcion} 
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

// Define PropTypes para Carrusel
Carrusel.propTypes = {
    className: PropTypes.string, // className es de tipo string
    style: PropTypes.object, // style es de tipo object
    onClick: PropTypes.func // onClick es de tipo función
};

// Componentes de flechas personalizadas
const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slick-arrow slick-prev ${className}`} // Agrega la clase slick-prev
            style={{ ...style, left: '10px', zIndex: '1' }} // Personaliza el estilo
            onClick={onClick}
        >
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slick-arrow slick-next ${className}`} // Agrega la clase slick-next
            style={{ ...style, right: '10px', zIndex: '1' }} // Personaliza el estilo
            onClick={onClick}
        >
            
        </div>
    );
};

export default Carrusel;
