import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const CircleChart = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Dataset',
                data: [12, 15, 3, 5, 2, 3], // Datos
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Opciones para el gráfico (opcional)
    const options = {
        // Aquí puedes definir opciones personalizadas como leyendas, etc.
    };

    return (
        <div className='w-[100%] h-[95%]'>
            
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default CircleChart