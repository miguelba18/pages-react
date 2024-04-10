

const Calendario = () => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Obtener la fecha actual
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Generar los días del mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-between py-2 px-4 bg-gray-800 text-white">
                <button className="text-white focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span>{`${months[month]} ${year}`}</span>
                <button className="text-white focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-7">
                {days.map(day => (
                    <div key={day} className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-center">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 border-t border-l">
                {Array(startingDayOfWeek).fill(null).map((_, index) => (
                    <div key={index} className="py-2 px-4 border-r border-b"></div>
                ))}
                {daysArray.map(day => (
                    <div key={day} className="py-2 px-4 border-r border-b">{day}</div>
                ))}
            </div>
        </div>
    
  )
}

export default Calendario