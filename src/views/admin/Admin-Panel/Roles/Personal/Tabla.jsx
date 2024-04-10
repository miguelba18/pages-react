
import PropTypes from 'prop-types';

const Tabla = ({ mayors, onDeleteMayor }) => {
    return (
        <table className="table-auto w-full mt-8">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Cedula</th>
              <th className="px-4 py-2">Contraseña</th>
              <th className="px-4 py-2">Celular</th>
              <th className="px-4 py-2">Correo electronico</th>
              <th className="px-4 py-2">Ciudad</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mayors.map((mayor) => (
              <tr key={mayor.id}>
                <td className="border px-4 py-2">{mayor.name}</td>
                <td className="border px-4 py-2">{mayor.apellido}</td>
                <td className="border px-4 py-2">{mayor.cedula}</td>
                <td className="border px-4 py-2">{mayor.password}</td>
                <td className="border px-4 py-2">{mayor.celular}</td>
                <td className="border px-4 py-2">{mayor.email}</td>
                <td className="border px-4 py-2">{mayor.city}</td>
                <td className="border px-4 py-2">{mayor.role}</td>
                
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded"
                    onClick={() => console.log('Editar', mayor.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => onDeleteMayor(mayor.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    );
}

Tabla.propTypes = {
  mayors: PropTypes.array.isRequired,
  onDeleteMayor: PropTypes.func.isRequired
};

export default Tabla;
