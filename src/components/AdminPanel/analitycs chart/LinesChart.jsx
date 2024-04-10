
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const LinesChart = () => {
    var beneficios = [200, 150, 300, 250, 400, 300, 250, 350, 200, 300, 250, 400];
    var deudas = [400,100,500,280,300,200,150,300,250,400,300,250];
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var midata = {
        labels: meses,
        datasets: [
            {
                label: 'Beneficios',
                data: beneficios,
                fill: true,
                tension: 0.5,
                backgroundColor: 'rgba(72,124,255,0.4)',
                borderColor: 'rgba(72,124,255,1)',
                pointRadius: 5,
                pointBorderColor: 'rgba(72,124,255,1)',
                pointBackgroundColor: 'rgba(72,124,255,1)',
                pointHoverRadius: 10,
                pointHoverBackgroundColor: 'rgba(72,124,255,1)',
                pointHoverBorderColor: 'rgba(72,124,255,1)',
                pointHoverBorderWidth: 2,
            },
            {
                label: 'Deudas',
                data: deudas,
                fill: true,
                tension: 0.5,
                backgroundColor: 'rgba(255,121,82,0.4)',
                borderColor: '#ff7952',
                pointRadius: 5,
                pointBorderColor: '#ff7952',
                pointBackgroundColor: '#ff7952',
                pointHoverRadius: 10,
                pointHoverBackgroundColor: '#ff7952',
                pointHoverBorderColor: '#ff7952',
                pointHoverBorderWidth: 2,
            },
        ]
    };

    var misoptions = {};

    return (
        <div>
            
            <Line data={midata} options={misoptions} />
        </div>
    );
}

export default LinesChart