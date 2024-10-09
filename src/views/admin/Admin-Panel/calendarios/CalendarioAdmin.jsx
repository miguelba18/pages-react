import useEditRecordatorio from "../../../hook/Calendario/Edit";
import Modaledit from "../../../hook/Calendario/modals/Modaledit";
import ModalList from "../../../hook/Calendario/modals/ModalAdmin/ModalList";
import ModalAdd from "../../../hook/Calendario/modals/ModalAdmin/ModalAdd";
import Calendar from "../../layouts/Calendar"
import useCalendarUtils from "../../../../utils/useCalendarUtils";
import { useState } from "react";

const Calendario = () => {
  const { editRecordatorio } = useEditRecordatorio();
  const [selectedRecordatorio, setSelectedRecordatorio] = useState(null);
  

  const{
    selectedYear,
    selectedMonth,
    selectedDay,
    newTitle,
    newDescription,
    newHour,
    newMinute,
    showEditForm,
    recordatoriosPorDia,
    setSelectedDay,
    setNewTitle,
    setNewDescription,
    setNewHour,
    setNewMinute,
    handleEditButtonClick,
    handleYearChange,
    handleMonthChange,
    handleDayClick,
    handleTitleChange,
    handleDescriptionChange,
    handleHourChange,
    handleMinuteChange,
    formatDate,
    formatHour,
    handleFechaHoraChange,
    isPastDate,
    eliminarRecordatorios,
    setShowEditForm,
    currentYear,
    daysOfWeek,
    monthsOfYear, 
  } = useCalendarUtils();

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push("");
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  const weeks = [];
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }
  return (
    <div>
      <div>
        <Calendar
        selectedMonth ={selectedMonth} 
        selectedYear ={selectedYear}
        handleMonthChange ={handleMonthChange}
        handleYearChange ={handleYearChange}
        daysOfWeek={daysOfWeek}
        monthsOfYear={monthsOfYear}
        currentYear={currentYear}
        handleDayClick={handleDayClick}
        recordatoriosPorDia={recordatoriosPorDia}
        weeks={weeks}
        isPastDate={isPastDate}
        selectedDay={selectedDay}
        />

        <div className="w-1/2 ml-4">
          {selectedDay && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 rounded-md shadow-xl w-80">
                <ModalAdd
                  setSelectedDay={setSelectedDay}
                  newTitle={newTitle}
                  newDescription={newDescription}
                  newHour={newHour}
                  newMinute={newMinute}
                  setNewTitle={setNewTitle}
                  setNewDescription={setNewDescription}
                  setNewHour={setNewHour}
                  setNewMinute={setNewMinute}
                  handleTitleChange={handleTitleChange}
                  handleDescriptionChange={handleDescriptionChange}
                  handleHourChange={handleHourChange}
                  handleMinuteChange={handleMinuteChange}
                  selectedDay={selectedDay}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  formatDate={formatDate}
                />
                {recordatoriosPorDia[selectedDay] && (
                  <ModalList
                    recordatoriosPorDia={recordatoriosPorDia}
                    selectedRecordatorio={selectedRecordatorio}
                    setSelectedRecordatorio={setSelectedRecordatorio}
                    eliminarRecordatorios={eliminarRecordatorios}
                    handleEditButtonClick={handleEditButtonClick}
                    formatHour={formatHour}
                    selectedDay={selectedDay}
                  />
                )}
                {showEditForm && selectedRecordatorio && (
                  <Modaledit
                    selectedRecordatorio={selectedRecordatorio}
                    setSelectedRecordatorio={setSelectedRecordatorio}
                    handleFechaHoraChange={handleFechaHoraChange}
                    editRecordatorio={editRecordatorio}
                    setShowEditForm={setShowEditForm}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
