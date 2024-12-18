import PropTypes from 'prop-types';

const Cards = ({ imagen, titulo, descripcion }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-80 object-cover rounded-t-lg"
      />
      <div hidden className="p-4 text-center">
        {titulo && <h5 className="text-lg font-semibold mb-2">{titulo}</h5>}
        {descripcion && <p className="text-sm text-gray-600">{descripcion}</p>}
      </div>
    </div>
  );
};

Cards.propTypes = {
  imagen: PropTypes.string.isRequired,
  titulo: PropTypes.string,
  descripcion: PropTypes.string,
};

export default Cards;
