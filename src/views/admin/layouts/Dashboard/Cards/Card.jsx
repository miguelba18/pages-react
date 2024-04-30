import React from 'react';
import { GoGraph } from "react-icons/go";
import PropTypes from 'prop-types';

const Card = ({ title, description, imageUrl, icon, price, labelColor }) => {
  const getColorClass = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'blue':
        return 'bg-blue-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, 
    imageUrl: PropTypes.string.isRequired,
    icon: PropTypes.object, 
    price: PropTypes.number,
    labelColor: PropTypes.string
  };

  return (
    <div className="bg-tertiary-100 shadow-xl   rounded-md p-2 max-w-xs mx-auto mb-8">
      <img className="w-full h-40 object-cover rounded-md" src={imageUrl} alt="Placeholder" />
      <div className="p-2">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
        {price && (
          <div className="flex items-start mt-2">
            {icon && <icon.type className="text-xl text-green-500 mr-2" />}
            <div className="ml-auto">
              <p className="text-base font-bold">{icon && icon.text}</p>
              <p className="text-base text-purple-800 font-bold">${price}</p>
            </div>
          </div>
        )}
        {labelColor && <div className={`text-white px-2 py-1 rounded-md mt-1 ${getColorClass(labelColor)}`}>Custom Label</div>}
      </div>
    </div>
  );
};

const CustomCard = ({ title, description, imageUrl, icon, price }) => {
  return (
    <div className="bg-tertiary-100 shadow-xl rounded-md p-2 max-w-sm mx-auto mb-8">
      <img className="w-full h-55 object-cover rounded-md" src={imageUrl} alt="Placeholder" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{description}</p>
        {price && (
          <div className="flex items-center mt-6">
            {icon && <icon.type className="text-xl text-green-500 mr-2" />}
            <p className="text-lg font-bold">{icon && icon.text}</p>
            <p className="ml-auto text-lg font-bold">${price}</p>
          </div>
        )}
      </div>
    </div>
  );
};
CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, 
  imageUrl: PropTypes.string.isRequired,
  icon: PropTypes.object, 
  price: PropTypes.number,
  
};

const DifferentCard = ({ title, description, imageUrl, icon, price }) => {
  return (
    <div className="bg-tertiary-100 shadow-xl rounded-md p-2 h-[90%] mx-8 m mb-1">
      <div className="w-full h-2  rounded-md" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{description}</p>
        {price && (
          <div className="flex items-center mt-8">
            {icon && <icon.type className="text-xl font-semibold text-green-800 mr-8" />}
            <p className="text-lg text-red-600 font-bold">{icon && icon.text}</p>
            <p className="ml-auto text-lg text-purple-500 font-bold">${price}</p>
          </div>
        )}
      </div>
    </div>
  );
};
DifferentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, 
  imageUrl: PropTypes.string.isRequired,
  icon: PropTypes.object, 
  price: PropTypes.number,
  labelColor: PropTypes.string
};

const CardList = () => {
  const cards = [
    {
      title: 'DIAN incrementó en 13% el recaudo de impuestos en 2023',
      description: 'Por otra parte, según el oficio, el valor del recaudo neto de los impuestos administrados por la Dian durante el período de enero a diciembre de 2023 alcanzó los $262.214. 4701 millones, representando un cumplimiento del 95,90% en relación con la meta de recaudo neto de $273.285.',
      imageUrl: "/src/assets/Img/img1.png", 
    },
    {
      title: 'Listado de Criptomoneda 11 de Abril 2024',
      description: 'Cotización y análisis de las principales critptomonedas en este momento. Bitcoin, Ethereum, Cardano, Solana, Litlecoin y Theter.',
      imageUrl: "/src/assets/img/CRIPTO.png",
    },
    {
      title: 'Total Income',
      price: 632000,
      icon: { type: GoGraph, text: '¡Subiendo!' }
      

    },
    
   
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <React.Fragment key={index}>
          {index < 2 ? (
            <Card key={index} title={card.title} description={card.description} imageUrl={card.imageUrl} icon={card.icon} price={card.price} />
          ) : (
            <DifferentCard key={index} title={card.title} description={card.description} imageUrl={card.imageUrl} icon={card.icon} price={card.price} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardList;
