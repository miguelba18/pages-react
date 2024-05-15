
import { RiEditBoxLine } from "react-icons/ri";
import EliminarRecordatorios from "../../Delete";
const useRecordatorioList = ({
  recordatoriosPorDia,
  selectedRecordatorio,
  setSelectedRecordatorio,
  eliminarRecordatorios,
  handleEditButtonClick,
  formatHour,
  selectedDay,
  userRoleId
}) => {
    
  return (
    <ul className="mt-4">
      {recordatoriosPorDia[selectedDay].map((recordatorio) => (
        <li key={recordatorio.id} className="mb-2  flex justify-between">
          <div className="">
            <strong
              onClick={() => {
                setSelectedRecordatorio(recordatorio);
              }}
              className="cursor-pointer hover:text-secundary"
            >
              {recordatorio.titulo}
            </strong>
            {selectedRecordatorio && selectedRecordatorio.id === recordatorio.id && (
              <div className="flex justify-between">
                <div>
                  <p>
                    <strong>Descripción:</strong> {selectedRecordatorio.descripcion}
                  </p>
                  <p>
                    <strong>Hora:</strong> {formatHour(selectedRecordatorio.fechaHora)}
                  </p>
                </div>
                {userRoleId === "Alcalde" &&  (
                <div className="flex justify-center ml-6 h-8">
                  <EliminarRecordatorios
                    id={recordatorio.id}
                    onDelete={eliminarRecordatorios}
                  />
                  <button
                    className="text-secundary ml-3 rounded-md bg-blue-100 p-2 hover:bg-blue-400 hover:text-white transitions-colors"
                    onClick={() => handleEditButtonClick(recordatorio)}
                  >
                    <RiEditBoxLine />
                  </button>
                </div>
                )}  
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default useRecordatorioList;
