
import PropTypes from 'prop-types';

const Cards = ({ imagen, titulo, descripcion }) => {
  return (
    <div className="card">
      <img src={imagen} alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
      </div>
    </div>
  );
};

Cards.propTypes = {
  imagen: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired
};

export default Cards
