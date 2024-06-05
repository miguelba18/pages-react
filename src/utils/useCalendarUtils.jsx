import { useState, useEffect } from "react";
import useFetchRecordatorios from "../views/hook/Calendario/List";
import { toast } from "react-toastify";
const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
  (day) => day.toUpperCase()
);
const monthsOfYear = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(i);
  return date.toLocaleDateString("es-ES", { month: "long" });
}).map((month) => month.toUpperCase());

function useCalendarUtils() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const currentYear = currentDate.getFullYear();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newHour, setNewHour] = useState("");
  const [newMinute, setNewMinute] = useState("");
  const [selectedRecordatorio, setSelectedRecordatorio] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [localRecordatorios, setLocalRecordatorios] = useState([]);
  const [recordatoriosPorDia, setRecordatoriosPorDia] = useState({});
  const [coloresAsignados, setColoresAsignados] = useState({});
  const { recordatorios } = useFetchRecordatorios();
  const [userRoleId, setuserRoleId] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roleId = decodedToken.role;

        setuserRoleId(roleId);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        window.localStorage.removeItem("token");
      }
    } else {
      toast.error("Error al token");
    }
  }, []);

  async function eliminarRecordatorios(id) {
    try {
      const updatedRecordatorios = localRecordatorios.filter(
        (recordatorio) => recordatorio.id !== id
      );
      setLocalRecordatorios(updatedRecordatorios);
      setSelectedDay(null);

      setTimeout(() => {
        window.location.reload();
      }, 1700);
    } catch (error) {
      console.error("Error al eliminar el recordatorio:", error);
    }
  }

  function handleEditButtonClick(recordatorio) {
    setSelectedRecordatorio(recordatorio);
    setShowEditForm(true);
  }

  function handleYearChange(e) {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setCurrentDate(new Date(year, selectedMonth, 1));
  }

  function handleMonthChange(e) {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    setCurrentDate(new Date(selectedYear, month, 1));
  }

  function handleDayClick(day) {
    setSelectedDay(day === selectedDay ? null : day);
  }

  function handleTitleChange(e) {
    setNewTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setNewDescription(e.target.value);
  }

  function handleHourChange(e) {
    setNewHour(e.target.value);
  }

  function handleMinuteChange(e) {
    setNewMinute(e.target.value);
  }

  function formatDate(year, month, day, time) {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const [hour, minute] = time.split(":");
    return `${year}-${formattedMonth}-${formattedDay}T${hour}:${minute}`;
  }

  function formatHour(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  function handleFechaHoraChange(e) {
    const nuevaFechaHora = e.target.value;
    const fechaHoraSinSegundos = nuevaFechaHora.split("T").join("T");
    setSelectedRecordatorio({
      ...selectedRecordatorio,
      fechaHora: fechaHoraSinSegundos,
    });
  }

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function isPastDate(year, month, day) {
    const currentDate = new Date();
    const selectedDate = new Date(year, month, day);
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return selectedDate < today;
  }

  useEffect(() => {
    const storedColoresAsignados = localStorage.getItem("coloresAsignados");
    if (storedColoresAsignados) {
      setColoresAsignados(JSON.parse(storedColoresAsignados));
    } else {
      setColoresAsignados({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("coloresAsignados", JSON.stringify(coloresAsignados));
  }, [coloresAsignados]);

  useEffect(() => {
    const recordatoriosDelMes = recordatorios.filter((recordatorio) => {
      const fecha = new Date(recordatorio.fechaHora);
      return (
        fecha.getFullYear() === selectedYear &&
        fecha.getMonth() === selectedMonth
      );
    });

    const recordatoriosPorDiaTemp = {};
    const coloresAsignadosTemp = { ...coloresAsignados };

    recordatoriosDelMes.forEach((recordatorio) => {
      const fecha = new Date(recordatorio.fechaHora);
      const dia = fecha.getDate();
      if (!recordatoriosPorDiaTemp[dia]) {
        recordatoriosPorDiaTemp[dia] = [];
      }
      if (!coloresAsignadosTemp[recordatorio.id]) {
        coloresAsignadosTemp[recordatorio.id] = getRandomColor();
      }
      recordatoriosPorDiaTemp[dia].push({
        ...recordatorio,
        color: coloresAsignadosTemp[recordatorio.id],
      });
    });

    setRecordatoriosPorDia(recordatoriosPorDiaTemp);
  }, [recordatorios, selectedYear, selectedMonth, coloresAsignados]);

  return {
    currentDate,
    selectedYear,
    selectedMonth,
    selectedDay,
    newTitle,
    newDescription,
    newHour,
    newMinute,
    selectedRecordatorio,
    showEditForm,
    localRecordatorios,
    recordatoriosPorDia,
    coloresAsignados,
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
    currentYear,
    daysOfWeek,
    monthsOfYear,
    userRoleId,
  };
}

export default useCalendarUtils;
