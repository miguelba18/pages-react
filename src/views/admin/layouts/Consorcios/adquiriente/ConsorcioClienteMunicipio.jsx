import { useState } from 'react';
import { FaHome, FaSearch, FaCog } from 'react-icons/fa'; 
const ConsorcioClienteMunicipio = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div
          className={`fixed  h-full bg-gray-800 text-white transition-width duration-300 ${
              isOpen ? 'w-64' : 'w-16'
          }`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
      >
          <ul className="space-y-4 p-4">
              <li>
                  <a href="#" className="flex items-center space-x-4">
                      <FaHome className="text-2xl" />
                      {isOpen && <span>Inicio</span>}
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center space-x-4">
                      <FaSearch className="text-2xl" />
                      {isOpen && <span>Buscar</span>}
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center space-x-4">
                      <FaCog className="text-2xl" />
                      {isOpen && <span>Configuración</span>}
                  </a>
              </li>
              {/* Añade más elementos aquí */}
          </ul>
      </div>
  );
};

export default ConsorcioClienteMunicipio
