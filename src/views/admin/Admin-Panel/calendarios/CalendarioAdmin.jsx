import { useState } from 'react';
import useFetchRecordatorios from '../../../hook/Calendario/List';
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => day.toUpperCase());

const monthsOfYear = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(i);
  return date.toLocaleDateString('es-ES', { month: 'long' });
}).map(month => month.toUpperCase());

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newHour, setNewHour] = useState('');
  const [newMinute, setNewMinute] = useState('');
  const { recordatorios, loading, error } = useFetchRecordatorios(); 
  const currentYear = currentDate.getFullYear();

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setCurrentDate(new Date(year, selectedMonth, 1));
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    setCurrentDate(new Date(selectedYear, month, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day === selectedDay ? null : day);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleHourChange = (e) => {
    setNewHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setNewMinute(e.target.value);
  };

  const formatDate = (year, month, day, time) => {
    
    const formattedMonth = month < 10 ? `0${month}` : month;
    
    const formattedDay = day < 10 ? `0${day}` : day;
    
    const [hour, minute] = time.split(':');
    
    return `${year}-${formattedMonth}-${formattedDay}T${hour}:${minute}`;
  };
  
  const addNote = async () => {
    if (!newTitle.trim() || !newDescription.trim() || !newHour.trim() || !newMinute.trim() || !selectedDay) return;

    const formattedDate = formatDate(selectedYear, selectedMonth + 1, selectedDay, `${newHour}:${newMinute}`);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:8080/api/V1/recordatorio/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: newTitle,
          descripcion: newDescription,
          fechaHora: formattedDate
        })
      });

      if (!response.ok) {
        throw new Error('Error al agregar el recordatorio');
      }

      alert('Recordatorio agregado exitosamente');
      setNewTitle('');
      setNewDescription('');
      setNewHour('');
      setNewMinute('');
      setSelectedDay(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar el recordatorio');
    }
  };

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push('');
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weeks = [];
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }

  return (
    <div className="flex flex-col items-center p-4">
      
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <div className='flex justify-center'>
          <img src='../../../../../src/assets/img/img2.png'/>
        </div>  
      <h1 className="text-center text-2xl font-bold mb-4">Calendario </h1>
        <div className="flex justify-center mb-2">
          <div className="flex items-center">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="px-2 py-1 bg-white border-2 border-gray-400 rounded mr-2"
            >
              {monthsOfYear.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="px-2 py-1  border-2  border-gray-400 rounded"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={currentYear - 5 + i}>{currentYear - 5 + i}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <table className="table-fixed w-58 text-gray-900 text-center">
            <thead>
              <tr>
                {daysOfWeek.map(day => (
                  <th key={day} className="px-3 py-4">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, index) => (
                <tr key={index}>
                  {week.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={`px-2 py-2 cursor-pointer ${
                        day === selectedDay ? 'bg-blue-500 text-white rounded-[89%]': ''
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-1/2 ml-4">
            {selectedDay && (
              <div>
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
                  <input
                    type="text"
                    className="w-1/2 px-2 py-1 border border-gray-300 rounded-md mr-1"
                    placeholder="Hora (HH)"
                    value={newHour}
                    onChange={handleHourChange}
                    pattern="[0-9]{2}"
                    title="Ingrese una hora válida en formato HH"
                  />
                  <span className="mr-1">:</span>
                  <input
                    type="text"
                    className="w-1/2 px-2 py-1 border border-gray-300 rounded-md ml-1"
                    placeholder="Minuto (MM)"
                    value={newMinute}
                    onChange={handleMinuteChange}
                    pattern="[0-9]{2}"
                    title="Ingrese un minuto válido en formato MM"
                  />
                </div>

                <button
                  className="px-2 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-900 block mx-auto mb-2"
                  onClick={addNote}
                >
                  Agregar recordatorio
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Recordatorios</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ul>
              {recordatorios.map(recordatorio => (
                <li key={recordatorio.id} className="mb-2">
                  <strong>{recordatorio.titulo}</strong> - {recordatorio.descripcion}- {recordatorio.fechaHora}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
