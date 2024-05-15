import { RiCalendarCloseFill } from "react-icons/ri";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useState } from "react";

const ModalAddAl = ({
  setSelectedDay,
  newTitle,
  newDescription,
  newHour,
  newMinute,
  setNewTitle,
  setNewDescription,
  setNewHour,
  setNewMinute,
  handleTitleChange,
  handleDescriptionChange,
  handleHourChange,
  handleMinuteChange,
  selectedDay,
  selectedMonth,
  selectedYear,
  formatDate,
  userRoleId,
}) => {
  const [error, setError] = useState(null);

  const addNote = async () => {
    if (
      !newTitle.trim() ||
      !newDescription.trim() ||
      !newHour.trim() ||
      !newMinute.trim() ||
      !selectedDay
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const formattedDate = formatDate(
      selectedYear,
      selectedMonth + 1,
      selectedDay,
      `${newHour}:${newMinute}`
    );

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/V1/recordatorio/alcalde",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            titulo: newTitle,
            descripcion: newDescription,
            fechaHora: formattedDate,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      toast.success("Recordatorio agregado exitosamente", { autoClose: 1200 });
      setSelectedDay(null);
      setNewTitle("");
      setNewDescription("");
      setNewHour("");
      setNewMinute("");
      setTimeout(() => {
        window.location.reload();
      }, 1700);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.message + ", (hay un lapso de 15 minutos entre reuniones)" ||
          "Error al agregar el recordatorio"
      );
    }
  };
  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          className="px-2 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-600 hover:text-white block "
          onClick={() => setSelectedDay(null)}
        >
          <RiCalendarCloseFill className="" />
        </button>
      </div>
      {userRoleId === "Alcalde" && (
        <>
          <input
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
            placeholder="Agregar título..."
            value={newTitle}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
            placeholder="Agregar descripción..."
            value={newDescription}
            onChange={handleDescriptionChange}
          />
          <div className="flex items-center mb-2">
            <select
              className="w-1/2 px-2 py-1 border border-gray-300 rounded-md mr-1"
              value={newHour}
              onChange={handleHourChange}
            >
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={hour < 10 ? `0${hour}` : `${hour}`}>
                  {hour < 10 ? `0${hour}` : `${hour}`}
                </option>
              ))}
            </select>

            <span className="mr-1">:</span>

            <select
              className="w-1/2 px-2 py-1 border border-gray-300 rounded-md ml-1"
              value={newMinute}
              onChange={handleMinuteChange}
            >
              {[...Array(60).keys()].map((minute) => (
                <option
                  key={minute}
                  value={minute < 10 ? `0${minute}` : `${minute}`}
                >
                  {minute < 10 ? `0${minute}` : `${minute}`}
                </option>
              ))}
            </select>
          </div>

          <button
            className="px-2 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-900 block mx-auto mb-2"
            onClick={addNote}
          >
            Agregar recordatorio
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};
ModalAddAl.propTypes = {
  setSelectedDay: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newDescription: PropTypes.string.isRequired,
  newHour: PropTypes.string.isRequired,
  newMinute: PropTypes.string.isRequired,
  setNewTitle: PropTypes.func.isRequired,
  setNewDescription: PropTypes.func.isRequired,
  setNewHour: PropTypes.func.isRequired,
  setNewMinute: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleHourChange: PropTypes.func.isRequired,
  handleMinuteChange: PropTypes.func.isRequired,
  selectedDay: PropTypes.number,
  selectedMonth: PropTypes.number,
  selectedYear: PropTypes.number,
  formatDate: PropTypes.func.isRequired,
  userRoleId: PropTypes.string.isRequired,
};

export default ModalAddAl;
