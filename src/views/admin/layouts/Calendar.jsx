import PropTypes from "prop-types";

const Calendar = ({
  selectedMonth,
  selectedYear,
  handleMonthChange,
  handleYearChange,
  daysOfWeek,
  monthsOfYear,
  currentYear,
  handleDayClick,
  recordatoriosPorDia,
  weeks,
  isPastDate,
  selectedDay,
}) => {
  return (
    <div className="p-4 rounded-lg shadow-xl bg-tertiary-100">
      <div className="flex justify-center mb-4">
        <img src="../../../../../src/assets/img/img1.png" alt="Calendario" />
      </div>
      <h1 className="text-secundary text-5xl font-medium text-center">
        Calendario
      </h1>
      <div className="mb-8">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="px-2 py-1 bg-white text-secundary/70 text-xl cursor-pointer border-gray-400 rounded mr-2"
        >
          {monthsOfYear.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="px-2 py-1 text-xl text-secundary/70 cursor-pointer border-gray-400 rounded"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={currentYear - 5 + i}>
              {currentYear - 5 + i}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl overflow-hidden flex mb-6 bg-tertiary-900">
        <table className="w-full text-[#1d3b80]">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th key={day} className="border-2 text-start  py-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {weeks.map((week, index) => (
              <tr key={index}>
                {week.map((day, dayIndex) => {
                  const isDisabled = isPastDate(
                    selectedYear,
                    selectedMonth,
                    day
                  );
                  return (
                    <td
                      key={dayIndex}
                      className={`border-2 text-xl rounded-3xl   ${
                        day === selectedDay ? "bg-blue-400/20 text-white " : ""
                      } h-[150px] w-20 relative ${
                        isDisabled
                          ? "opacity-30 cursor-not-allowed"
                          : "selectable-day cursor-pointer"
                      }`}
                      onClick={() => !isDisabled && handleDayClick(day)}
                    >
                      <div className="absolute top-0 left-0 m-1 text-xl text-secundary">
                        {day}
                      </div>
                      {recordatoriosPorDia[day] && (
                        <ul className="absolute bottom-0 left-3 text-secundary">
                          {recordatoriosPorDia[day].map((recordatorio) => (
                            <li
                              key={recordatorio.id}
                              className="rounded-md px-2 mb-1 text-sm"
                              style={{
                                backgroundColor: recordatorio.color,
                                color: "#ffffff",
                              }}
                            >
                              {recordatorio.titulo}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
Calendar.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  
  handleYearChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired,
  daysOfWeek: PropTypes.array.isRequired,
  monthsOfYear: PropTypes.array.isRequired,
  currentYear: PropTypes.number.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  recordatoriosPorDia: PropTypes.object.isRequired,
  weeks: PropTypes.array.isRequired,
  isPastDate: PropTypes.func.isRequired,
  selectedDay: PropTypes.number.isRequired,
};

export default Calendar;
